const arabicNumbers = "٠١٢٣٤٥٦٧٨٩";
const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
const englishNumbers = "0123456789";
const arabicChars = ["ي", "ك", "‍", "دِ", "بِ", "زِ", "ذِ", "ِشِ", "ِسِ", "ى", "ة"];
const persianChars = ["ی", "ک", "", "د", "ب", "ز", "ذ", "ش", "س", "ی", "ه"];
const keyboardPersianChars = [ "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ", "ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ", "ظ", "ط", "ز", "ر", "ذ", "د", "پ", "و","؟","ئ" ];
const keyboardEnglishChars = [ "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "\\", ",","?","m" ];

function replaceAll(text: string, find: string, replace: string) {
  return text.split(find).join(replace);
}
export class Persian {
  constructor(private text: string) { }

  public toPersianChars(): Persian {
    for (let index = 0; index < arabicChars.length; index++) {
      this.text = replaceAll(this.text, arabicChars[index], persianChars[index]);
    }
    return this;
  }

  public toPersianNumbers(): Persian {
    for (let index = 0; index < englishNumbers.length; index++) {
      this.text = replaceAll(this.text, englishNumbers[index], persianNumbers[index]);
    }
    for (let index = 0; index < arabicNumbers.length; index++) {
      this.text = replaceAll(this.text, arabicNumbers[index], persianNumbers[index]);
    }
    return this;
  }

  public toArabicNumbers(): Persian {
    for (let index = 0; index < englishNumbers.length; index++) {
      this.text = replaceAll(this.text, englishNumbers[index], arabicNumbers[index]);
    }
    for (let index = 0; index < persianNumbers.length; index++) {
      this.text = replaceAll(this.text, persianNumbers[index], arabicNumbers[index]);
    }
    return this;
  }

  public toEnglishNumbers(): Persian {
    for (let index = 0; index < persianNumbers.length; index++) {
      this.text = replaceAll(this.text, persianNumbers[index], englishNumbers[index]);
    }
    for (let index = 0; index < arabicNumbers.length; index++) {
      this.text = replaceAll(this.text, arabicNumbers[index], englishNumbers[index]);
    }
    return this;
  }

  public toPersianKeyboard(): Persian {
    for (let index = 0; index < keyboardEnglishChars.length; index++) {
      this.text = replaceAll(this.text, keyboardEnglishChars[index], keyboardPersianChars[index]);
    }
    return this;
  }

  public toEnglishKeyboard(): Persian {
    for (let index = 0; index < keyboardPersianChars.length; index++) {
      this.text = replaceAll(this.text, keyboardPersianChars[index], keyboardEnglishChars[index]);
    }
    return this;
  }

  public value(): string {
    return this.text;
  }
}