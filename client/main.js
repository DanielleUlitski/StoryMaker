import Eventhandler from './event-handler.js'
import DataManager from './datamanager.js'
import Renderer from './renderer.js'

const dataManager = new DataManager();
const renderer = new Renderer();
const eventHandler = new Eventhandler(dataManager, renderer);

eventHandler.socketConnect();
eventHandler.socketLogin();
eventHandler.newStory();
eventHandler.sendInvite();
eventHandler.recieveInvite();
eventHandler.declineInvite();
eventHandler.acceptInvite();
eventHandler.sentenceHandle();
eventHandler.submitOnEnter();
eventHandler.saveStory()
eventHandler.finishStory()
eventHandler.leaveStory()
eventHandler.viewAllStories();