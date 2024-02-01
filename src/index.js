import { 
  getUsername,
  contentWelcomeMessage,
  onClose,
  showGoodbyeMessage,
  getWorkingDirectory
} from './helper.js'
import { listenInputCommands } from './inputController.js'

const startFileManager = () =>{
  contentWelcomeMessage(getUsername())

  listenInputCommands()

  getWorkingDirectory()
  onClose()
  showGoodbyeMessage()
}

startFileManager()
