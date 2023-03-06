import ActionProvider from './ActionProvider';

class MessageParser {
  actionProvider: ActionProvider;
  state: any
  constructor(actionProvider: ActionProvider, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message: string) {
    const lowercase = message.toLowerCase();

    if (this.findCuisineId(lowercase)) {
      this.actionProvider.handleCuisineMatch(
        lowercase,
        this.findCuisineId(lowercase)
      );
    } else {
      this.actionProvider.unhandledInput();
    }
  }
  findCuisineId = (lowercase: string) => {
    const cuisinesList = {
      american: 1,
      asian: 3,
      arabian: 4,
      bakery: 5,
      afghani: 6,
      chinese: 25,
      continental: 35,
      european: 38,
      fast_food: 40,
      french: 45,
      north_indian: 50,
      italian: 55,
      japanese: 60,
      lebanese: 66,
      korean: 67,
      malaysian: 69,
      mediterranean: 70,
      mexican: 73,
      mongolian: 74,
      persian: 81,
      pizza: 82,
      seafood: 83,
      russian: 84,
      south_indian: 85,
      sri_lankan: 86,
      portuguese: 87,
      spanish: 89,
      street_food: 90,
      tibetan: 93,
      thai: 95,
      vietnamese: 99,
      desserts: 100,
      cambodian: 111,
      filipino: 112,
      indonesian: 114,
      nepalese: 117,
      singaporean: 119,
      cantonese: 121,
      sichuan: 128,
      australian: 131,
      belgian: 132,
      british: 133,
      german: 134,
      irish: 135,
      latin_american: 136,
      middle_eastern: 137,
      pakistani: 139,
      iranian: 140,
      steak: 141,
      turkish: 142,
      healthy_food: 143,
      contemporary: 144,
      egyptian: 146,
      moroccan: 147,
      indian: 148,
      tex_mex: 150,
      argentine: 151,
      african: 152,
      international: 154,
      greek: 156,
      brazilian: 159,
      coffee_and_tea: 161,
      peruvian: 162,
      tea: 163,
      juices: 164,
      kiwi: 167,
      burger: 168,
      sushi: 177,
      kebab: 178,
      tapas: 179,
      grill: 181,
      taiwanese: 190,
      deli: 192,
      bbq: 193,
      dutch: 204,
      pan_asian: 209,
      bar_food: 227,
      hungarian: 228,
      ice_cream: 233,
      bubble_tea: 247,
      jewish: 265,
      south_african: 267,
      drinks_only: 268,
      beverages: 270,
      finger_food: 271,
      fusion: 274,
      colombian: 287,
      modern_european: 294,
      fish_and_chips: 298,
      sandwich: 304,
      vegetarian: 308,
      ramen: 320,
      pacific: 321,
      asian_fusion: 401,
      frozen_yogurt: 501,
      hawaiian: 521,
      falafel: 571,
      venezuelan: 641,
      crepes: 881,
      creole: 928,
      modern_australian: 969,
      meat_pie: 977,
      yum_cha: 978,
      teppanyaki: 981,
      croatian: 982,
      pub_food: 983,
      dumplings: 985,
      charcoal_chicken: 994,
      salad: 998,
      fijian: 1006,
      poké: 1019,
      pho: 1020,
      korean_bbq: 1021,
      hot_pot: 1022,
      fried_chicken: 1025,
      roast: 1033,
      vegan: 1034,
      japanese_bbq: 1036,
      uyghur: 1038,
      cafe_food: 1039,
      jiangnan: 1042,
      modern_new_zealand: 1055,
      malatang: 1058,
    };
    const key = lowercase as keyof typeof cuisinesList;
    return cuisinesList[key];
  };
}

export default MessageParser;
