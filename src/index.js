import { 
  getUsername,
  contentWelcomeMessage,
  onClose,
  showGoodbyeMessage
} from './helper.js'
import { listenInputCommands } from './inputController.js'

const startFileManager = () =>{
  contentWelcomeMessage(getUsername())

  listenInputCommands()

  onClose()
  showGoodbyeMessage()
}

startFileManager()
