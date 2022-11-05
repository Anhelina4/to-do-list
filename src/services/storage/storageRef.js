import { ref } from 'firebase/storage'
import storage from './storage'

const storageRef = (path) => ref(storage, path)

export default storageRef
