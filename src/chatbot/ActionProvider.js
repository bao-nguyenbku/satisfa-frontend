class ActionProvider {
constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  unhandledInput = () => {
    const message = this.createChatBotMessage(
      "I did not understand that. Please type a cuisine."
    );
    this.addMessageToState(message);
  };

  handleDineIn =() =>{
    const message = this.createChatBotMessage(
        "Please wait a second.",
        {
            widget: "dineIn"
        }
    )
    this.addMessageToState(message);
  }

  handleCategoryTypeDelivery = (state) => {
    const message1 = this.createChatBotMessage("Finding a place, one moment.", {
      widget: "Restaurant1",
    });
    this.setState((state) => ({
      ...state,
      categoryType: "Delivery",
    }));
    this.addMessageToState(message1);
    const message2 = this.createChatBotMessage("What do you think?", {
      widget: "MenuSkipBtns1",
    });
    this.addMessageToState(message2);
  };
  handleCuisineMatch = (cuisineDesc, cuisineId) => {
    const message = this.createChatBotMessage(
      `${cuisineDesc}! not a bad choice.`,
      {
        widget: "categoryTypes",
      }
    );
    this.addMessageToState(message);
    this.setState((state) => ({
      ...state,
      cuisineType: cuisineId,
    }));
  };

  handleGetStartedBtn = () => {
    const message = this.createChatBotMessage("What cuisine would you like?");
    this.addMessageToState(message);
  };

  handleCategoryTypeTakeaway = () => {
    const message = this.createChatBotMessage("How about...", {
      widget: "Restaurant1",
    });
    this.addMessageToState(message);
    this.setState((state) => ({
      ...state,
      categoryType: "Takeaway",
    }));
    const message2 = this.createChatBotMessage("What do you think?", {
      widget: "MenuSkipBtns1",
    });
    this.addMessageToState(message2);
  };

  handleCategoryTypeDineOut = () => {
    const message = this.createChatBotMessage("How about...", {
      widget: "Restaurant1",
    });
    this.addMessageToState(message);
    this.setState((state) => ({
      ...state,
      categoryType: "Dine-out",
    }));
    const message2 = this.createChatBotMessage("What do you think?", {
      widget: "MenuSkipBtns1",
    });
    this.addMessageToState(message2);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;