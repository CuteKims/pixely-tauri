pub async fn get(target: String) -> Result<String, Box<dyn std::error::Error>> {
    Ok(reqwest::get(target).await?.text().await?)
}