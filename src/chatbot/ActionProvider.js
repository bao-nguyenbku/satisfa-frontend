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
        "Pick a time range and number of people",
        {
            widget: "dineIn"  // then we need an api to return if there is a table still empty
        }
    )
    this.addMessageToState(message);

  }

  handleDineInSubmitBtn = (fromTime, toTime, amount) => {

    const message = this.createChatBotMessage(
      `So you want to book a table from ${fromTime.slice(11)} to ${toTime.slice(11)} on ${fromTime.slice(0,10)} for ${amount} people`,
      {
        widget: "checkEmptyTable",
        payload: {age: 18}
      }
    )
    this.setState(
      (state) => ({
      ...state,
      fromTime: fromTime,
      toTime: toTime,
      customerAmount: amount
    })
    );
    this.addMessageToState(message);
  }

  handleBookingTable = () => {
    
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