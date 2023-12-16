use std::collections::HashMap;
use serde_derive::Deserialize;
use serde_derive::Serialize;

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
    pub asset_index: FileDownloadIndex,
    pub assets: String,
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
pub struct FileDownloadIndex {
    pub id: Option<String>,
    pub path: Option<String>,
    pub sha1: String,
    pub size: i64,
    pub total_size: Option<i64>,
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
    pub client: FileDownloadIndex,
    pub server: FileDownloadIndex,
    pub client_mappings: Option<FileDownloadIndex>,
    pub server_mappings: Option<FileDownloadIndex>,
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
    pub artifact: Option<FileDownloadIndex>,
    pub classifiers: Option<LibraryDownloadClassifier>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub struct LibraryDownloadClassifier {
    pub javadoc: Option<FileDownloadIndex>,
    pub natives_osx: Option<FileDownloadIndex>,
    pub sources: Option<FileDownloadIndex>,
    pub natives_linux: Option<FileDownloadIndex>,
    pub natives_windows: Option<FileDownloadIndex>,
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
    pub file: FileDownloadIndex,
    #[serde(rename = "type")]
    pub type_field: String,
}