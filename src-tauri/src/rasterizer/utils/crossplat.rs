pub fn get_os_info() -> Result<OsInfo, Box<dyn std::error::Error>> {
    let arch = String::from(std::env::consts::ARCH);
    let mut is_winver_above_10 = false;
    let mut os: String;
    if std::env::consts::OS == "windows" {
        os = String::from("windows");
        let string = get_winver()?;
        let mut ver = String::new();
        for (i, char) in string.chars().enumerate() {
            if char == '.' {
                break;
            };
            ver.push(char);
        }
        if ver == "10" {
            is_winver_above_10 = true
        } else {
        }
    } else if std::env::consts::OS == "macos" {
        os = String::from("osx");
    } else {
        os = String::from(std::env::consts::OS);
    }
    Ok(OsInfo {
        os,
        arch,
        is_winver_above_10,
    })
}

#[derive(Debug, Clone, PartialEq)]
pub struct OsInfo {
    pub os: String,
    pub arch: String,
    pub is_winver_above_10: bool,
}

pub fn get_winver() -> Result<String, Box<dyn std::error::Error>> {
    let output = std::process::Command::new("cmd.exe")
        .args(&["/C", "chcp 437|ver"])
        .output()?;
    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(extract_winver_from_str(&stdout)?.to_string())
}

fn extract_winver_from_str(input: &str) -> Result<&str, Box<dyn std::error::Error>> {
    let err_msg: &str = "Cannot parse winver from str";
    lazy_static::lazy_static! {
        static ref RE: regex::Regex = regex::Regex::new(r"Microsoft\sWindows\s\[Version\s(\d+(\.\d+)+)\]").unwrap();
    }
    let captured = RE
        .captures(input)
        .ok_or_else(|| err_msg)?
        .get(1)
        .ok_or_else(|| err_msg)?
        .as_str();
    Ok(captured)
}
