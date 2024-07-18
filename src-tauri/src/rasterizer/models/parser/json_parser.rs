use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct InstanceJson {
    //for startup:
    pub arguments: Option<Arguments>,
    pub minecraft_arguments: Option<String>,
    pub java_version: JavaVersion,
    pub logging: Option<Logging>,
    pub main_class: String,

    //for installation:
    pub asset_index: AssetIndex,
    pub downloads: Downloads,
    pub libraries: Vec<LibraryJar>,

    //for information:
    pub id: String,
    pub compliance_level: i64,
    pub minimum_launcher_version: i64,
    pub release_time: String,
    pub time: String,
    #[serde(rename = "type")]
    pub type_field: String,
    pub client_version: Option<String>,
}

// ### Arguments

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Arguments {
    pub game: Vec<GameArguments>,
    pub jvm: Vec<JvmArguments>,
}

// Game Arguments

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(untagged)]
pub enum GameArguments {
    ConstantArgument(String),
    VariantArgument(VariantGameArgument),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct VariantGameArgument {
    pub rules: Vec<GameArgumentRule>,
    pub value: ArgumentValue,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameArgumentRule {
    action: String,
    features: GameArgumentRuleFeatures,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameArgumentRuleFeatures {
    #[serde(flatten)]
    extra: HashMap<String, bool>,
}

// End Game Arguments

// JVM Arguments

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(untagged)]
pub enum JvmArguments {
    ConstantArgument(String),
    VariantArgument(VariantJvmArgument),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct VariantJvmArgument {
    pub rules: Vec<JvmArgumentRule>,
    pub value: ArgumentValue,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct JvmArgumentRule {
    pub action: JvmArgumentAction,
    pub os: Option<JvmArgumentRuleOs>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum JvmArgumentAction {
    Allow,
    Disallow,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct JvmArgumentRuleOs {
    pub name: Option<String>,
    pub version: Option<String>,
    pub arch: Option<String>,
}

// End JVM Arguments

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ArgumentValue {
    Single(String),
    Mutiple(Vec<String>),
}

// ### End Arguments

// ### JavaVersion

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct JavaVersion {
    pub component: String,
    pub major_version: i64,
}

// ### Logging

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Logging {
    pub client: Client,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Client {
    pub argument: String,
    pub file: ClientLoggingXml,
    #[serde(rename = "type")]
    pub type_field: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ClientLoggingXml {
    id: String,
    sha1: String,
    size: usize,
    url: String,
}


// ### End Logging

// ### AssetIndex

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AssetIndex {
    pub id: String,
    pub sha1: String,
    pub size: usize,
    pub total_size: usize,
    pub url: String,
}

// ### Downloads

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Downloads {
    pub client: InstanceExecutableJar,
    pub server: InstanceExecutableJar,
    pub client_mappings: Option<InstanceExecutableJar>,
    pub server_mappings: Option<InstanceExecutableJar>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct InstanceExecutableJar {
    pub sha1: String,
    pub size: usize,
    pub url: String,
}

// ### End Downloads

// ### LibraryJar

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LibraryJar {
    pub downloads: LibraryDownload,
    pub name: String,
    pub rules: Option<Vec<JvmArgumentRule>>,
    pub extract: Option<Extract>,
    pub natives: Option<HashMap<String, String>>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LibraryDownload {
    pub artifact: Option<LibraryDownloadIndex>,
    pub classifiers: Option<HashMap<String, LibraryDownloadIndex>>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct LibraryDownloadIndex {
    pub path: String,
    pub sha1: String,
    pub size: usize,
    pub url: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Extract {
    pub exclude: Vec<String>,
}

// ### End LibraryJar



#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Natives {
    pub osx: Option<String>,
    pub linux: Option<String>,
    pub windows: Option<String>,
}


