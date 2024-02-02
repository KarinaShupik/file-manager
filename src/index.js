import { 
  getUsername,
  contentWelcomeMessage,
  onClose,
  showGoodbyeMessage,
  showWorkingDirectory
} from './helper.js'
import { listenInputCommands } from './inputController.js'

const startFileManager = () =>{
  contentWelcomeMessage(getUsername())

  listenInputCommands()

  showWorkingDirectory()
  onClose()
  showGoodbyeMessage()
}

startFileManager()
