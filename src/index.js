import { 
  getUsername,
  contentWelcomeMessage,
  onClose,
  showGoodbyeMessage,
  showWorkingDirectory
} from './helper.js'
import { getWorkingDirectory, setWorkingDirectory} from './path.js';
import { listenInputCommands } from './inputController.js'

const startFileManager = () =>{
  contentWelcomeMessage(getUsername())

  listenInputCommands()

  showWorkingDirectory(getWorkingDirectory())
  onClose()
  showGoodbyeMessage()
}

startFileManager()
