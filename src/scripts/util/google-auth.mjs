// scripts-utils/test-google-api.mjs
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Function to write to log file
function writeLog(message) {
  const logPath = path.join(process.cwd(), 'google-api-test.log')
  fs.appendFileSync(logPath, message + '\n')
}

try {
  writeLog('Script started: ' + new Date().toISOString())

  // Load environment variables
  writeLog('Loading environment variables')
  dotenv.config()

  // Log environment variable
  const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH
  writeLog(`Credentials path: ${credentialsPath || 'NOT SET'}`)

  if (!credentialsPath) {
    writeLog('ERROR: GOOGLE_CREDENTIALS_PATH is not set in .env file')
    process.exit(1)
  }

  // Check if file exists
  writeLog('Checking if credentials file exists')
  if (fs.existsSync(credentialsPath)) {
    writeLog(`File exists: ${credentialsPath}`)

    // Read file
    const fileContents = fs.readFileSync(credentialsPath, 'utf8')
    writeLog(`File read successfully (${fileContents.length} bytes)`)

    // Try parsing
    const jsonData = JSON.parse(fileContents)
    writeLog('File is valid JSON')

    // Check structure
    if (jsonData.installed || jsonData.web) {
      writeLog('Credentials file has correct structure')
    } else {
      writeLog('ERROR: Credentials file missing expected structure')
    }
  } else {
    writeLog(`ERROR: File not found: ${credentialsPath}`)
  }

  writeLog('Test completed successfully')
} catch (error) {
  writeLog(`ERROR: ${error.message}`)
  writeLog(`Stack trace: ${error.stack}`)
}
