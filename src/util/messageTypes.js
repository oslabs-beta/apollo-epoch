const sendMessageTypes = {
  epoch: { initializeConnection: 'initializeConnection', sayHello: 'sayHello' },
  contentScript: { epochReceived: 'messageReceivedEpoch', messageReceived: 'messageReceived' },
  background: { placeholder: 'placeholder' },
};

export default sendMessageTypes;
