class IntroductionIndent {
  data: Array<string> = ['hello', 'xin chào', 'chào bạn', 'hi'];
  isValid(message: string) {
    const rawMessage = message.toLowerCase().trim();
    return this.data.some(sentence => rawMessage.includes(sentence));
  }
}

export { IntroductionIndent };
