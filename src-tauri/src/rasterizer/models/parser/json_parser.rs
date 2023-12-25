use std::collections::HashMap;
use serde::{Serialize, Deserialize};
use super::super::downloader::LibraryIndex;

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
    pub libraries: Vec<Library>,

    //for information:
    pub id: String,
    pub compliance_level: i64,
    pub minimum_launcher_version: i64,
    pub release_time: String,
    pub time: String,
    #[serde(rename = "type")]
    pub type_field: String,
    pub client_version: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AssetIndex {
    pub id: String,
    pub sha1: String,
    pub size: i32,
    pub total_size: i32,
    pub url: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Arguments {
    pub game: Vec<GameArguments>,
    pub jvm: Vec<JvmArguments>,
}

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
    features: GameArgumentRuleFeatures
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameArgumentRuleFeatures {
    #[serde(flatten)]
    extra: HashMap<String, bool>
}

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
    pub action: String,
    pub os: Option<JvmArgumentRuleOs>
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct JvmArgumentRuleOs {
    pub name: Option<String>,
    pub version: Option<String>,
    pub arch: Option<String>
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ArgumentValue {
    Signle(String),
    Mutiple(Vec<String>),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Downloads {
    pub client: LibraryIndex,
    pub server: LibraryIndex,
    pub client_mappings: Option<LibraryIndex>,
    pub server_mappings: Option<LibraryIndex>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct JarIndex {
    pub sha1: String,
    pub size: i32,
    pub url: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct JavaVersion {
    pub component: String,
    pub major_version: i64,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Library {
    pub downloads: Option<LibraryDownload>,
    pub name: String,
    #[serde(default)]
    pub rules: Vec<JvmArgumentRule>,
    pub extract: Option<Extract>,
    pub natives: Option<Natives>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LibraryDownload {
    pub artifact: Option<LibraryIndex>,
    pub classifiers: Option<LibraryDownloadClassifier>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub struct LibraryDownloadClassifier {
    pub javadoc: Option<LibraryIndex>,
    pub natives_osx: Option<LibraryIndex>,
    pub sources: Option<LibraryIndex>,
    pub natives_linux: Option<LibraryIndex>,
    pub natives_windows: Option<LibraryIndex>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct LibraryIndex {
    path: String,
    sha1: String,
    size: i32,
    url: String
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Extract {
    pub exclude: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Natives {
    pub osx: Option<String>,
    pub linux: Option<String>,
    pub windows: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Logging {
    pub client: Client,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Client {
    pub argument: String,
    pub file: LibraryIndex,
    #[serde(rename = "type")]
    pub type_field: String,
}