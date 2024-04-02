use std::path::{Path, PathBuf};

use crate::rasterizer::{
    models::{
        parser::resource_parser::{
            DownloadIndex, DownloadSource, InstanceResource, InstanceResourceType,
        },
        parser::{
            asset_parser::AssetObject,
            json_parser::{
                AssetIndex, InstanceExecutableJar, JavaArgumentRule, JavaArgumentRuleOs,
                JvmArgumentAction, LibraryDownloadIndex, LibraryJar,
            },
        },
    },
    utils::crossplat::{get_os_info, OsInfo},
};

impl InstanceResource for DownloadIndex {
    fn parse(
        &self,
        instance_id: String,
        source: DownloadSource,
        os_info: OsInfo,
    ) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>> {
        Ok(vec![self.clone()])
    }
}

impl InstanceResource for InstanceExecutableJar {
    fn parse(
        &self,
        instance_id: String,
        source: DownloadSource,
        os_info: OsInfo,
    ) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>> {
        let mut path = PathBuf::new();
        path.push(format!("/versions/{}/{}.jar", instance_id, instance_id).as_str());
        Ok(vec![DownloadIndex {
            resource_type: InstanceResourceType::InstanceJar,
            path,
            sha1: Option::Some(self.sha1.clone()),
            size: Option::Some(self.size),
            url: self.url.clone(),
        }])
    }
}

impl InstanceResource for AssetIndex {
    fn parse(
        &self,
        instance_id: String,
        source: DownloadSource,
        os_info: OsInfo,
    ) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>> {
        let mut path = PathBuf::new();
        path.push(format!("/assets/indexes/{}.json", self.id).as_str());
        Ok(vec![DownloadIndex {
            resource_type: InstanceResourceType::AssetsMap,
            path,
            sha1: Option::Some(self.sha1.clone()),
            size: Option::Some(self.size),
            url: self.url.clone(),
        }])
    }
}

impl InstanceResource for AssetObject {
    fn parse(
        &self,
        instance_id: String,
        source: DownloadSource,
        os_info: OsInfo,
    ) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>> {
        let mut path = PathBuf::new();
        path.push(Path::new(&format!(
            "/assets/objects/{}/{}",
            &self.hash[0..2],
            &self.hash
        )));
        Ok(vec![DownloadIndex {
            resource_type: InstanceResourceType::Asset,
            path,
            sha1: Option::Some(self.hash.clone()),
            size: Option::Some(self.size),
            url: format!(
                "https://bmclapi2.bangbang93.com/assets/{}/{}",
                &self.hash[0..2],
                &self.hash
            ),
        }])
    }
}

impl InstanceResource for LibraryJar {
    fn parse(
        &self,
        instance_id: String,
        source: DownloadSource,
        os_info: OsInfo,
    ) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>> {
        let mut vec: Vec<DownloadIndex> = Vec::new();
        let mut format_and_push = |library_index: &LibraryDownloadIndex| -> () {
            let mut path = PathBuf::new();
            path.push(library_index.path.clone());
            vec.push(DownloadIndex {
                resource_type: InstanceResourceType::LibraryJar,
                path,
                sha1: Some(library_index.sha1.clone()),
                size: Some(library_index.size),
                url: library_index.url.clone(),
            })
        };
        let mut closure = || {
            if self.downloads.classifiers.is_some() {
                for (os, native) in self.natives.clone().unwrap().into_iter() {
                    if os == os_info.os {
                        format_and_push(&self.downloads.classifiers.as_ref().unwrap()[&native])
                    }
                }
            }
        };
        match &self.rules {
            Some(rules) => {
                closure();
                if rules.clone().check(os_info) && self.downloads.artifact.is_some() {
                    format_and_push(self.downloads.artifact.as_ref().unwrap());
                }
            }
            None => {
                closure();
                if self.downloads.artifact.is_some() {
                    format_and_push(self.downloads.artifact.as_ref().unwrap());
                }
            }
        }
        Ok(vec)
    }
}

pub trait JsonRules {
    fn check(self, os_info: OsInfo) -> bool; //To be changed
}

impl JsonRules for Vec<JavaArgumentRule> {
    fn check(self, os_info: OsInfo) -> bool {
        fn match_rule(os_rule: JavaArgumentRuleOs, os_info: OsInfo) -> bool {
            let is_satisfied: bool;
            match os_rule.name {
                Some(os_name) => {
                    if os_name == os_info.os {
                        //is Windows
                        if os_info.os == "windows" {
                            //Required Windows version
                            if os_rule.version.is_some() && os_info.is_winver_above_10 {
                                is_satisfied = true;
                            //Doesn't require Windows version
                            } else if os_rule.version.is_none() {
                                is_satisfied = true;
                            //Required Windows version but doesn't satisfied
                            } else {
                                is_satisfied = false;
                            }
                        //Not Windows
                        } else {
                            is_satisfied = true;
                        }
                    } else {
                        is_satisfied = false;
                    }
                }
                None => {
                    is_satisfied = true;
                }
            }
            is_satisfied
        }
        let mut is_satisfied: bool = true;
        for rule in self.into_iter() {
            match rule.action {
                JvmArgumentAction::Allow => match &rule.os {
                    Some(_) => {
                        is_satisfied = match_rule(rule.os.unwrap(), os_info.clone());
                    }
                    None => {
                        is_satisfied = true;
                    }
                },
                JvmArgumentAction::Disallow => return !match_rule(rule.os.unwrap(), os_info),
            }
        }
        is_satisfied
    }
}
