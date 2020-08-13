const sendMessageTypes = {
  epoch: { initializeConnection: 'initializeConnection', sayHello: 'sayHello' },
  contentScript: {
    epochReceived: 'messageReceivedEpoch',
    messageReceived: 'messageReceived',
    messingAround: 'justMessin',
  },
  background: { placeholder: 'placeholder' },
};

export default sendMessageTypes;
