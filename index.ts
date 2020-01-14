const delimiter = ' و ';
const zero = 'صفر';
const negative = 'منفی ';
const letters = [
  ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
  ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'],
  ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
  ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
  ['', ' هزار', ' میلیون', ' میلیارد', ' بیلیون', ' بیلیارد', ' تریلیون', ' تریلیارد',
    'کوآدریلیون', ' کادریلیارد', ' کوینتیلیون', ' کوانتینیارد', ' سکستیلیون', ' سکستیلیارد', ' سپتیلیون',
    'سپتیلیارد', ' اکتیلیون', ' اکتیلیارد', ' نانیلیون', ' نانیلیارد', ' دسیلیون', ' دسیلیارد'],
];
const decimalSuffixes = [
  '',
  'دهم',
  'صدم',
  'هزارم',
  'ده‌هزارم',
  'صد‌هزارم',
  'میلیونوم',
  'ده‌میلیونوم',
  'صدمیلیونوم',
  'میلیاردم',
  'ده‌میلیاردم',
  'صد‌‌میلیاردم'
];
const prepareNumber = (num: any) => {
  let Out = num;
  if (typeof Out === 'number') {
    Out = Out.toString();
  }
  const NumberLength = Out.length % 3;
  if (NumberLength === 1) {
    Out = `00${Out}`;
  } else if (NumberLength === 2) {
    Out = `0${Out}`;
  }
  return Out.replace(/\d{3}(?=\d)/g, '$&*')
    .split('*');
};

const threeNumbersToLetter = (num: any) => {
  if (parseInt(num, 0) === 0) {
    return '';
  }
  const parsedInt = parseInt(num, 0);
  if (parsedInt < 10) {
    return letters[0][parsedInt];
  }
  if (parsedInt <= 20) {
    return letters[1][parsedInt - 10];
  }
  if (parsedInt < 100) {
    const one = parsedInt % 10;
    const ten = (parsedInt - one) / 10;
    if (one > 0) {
      return letters[2][ten] + delimiter + letters[0][one];
    }
    return letters[2][ten];
  }
  const one = parsedInt % 10;
  const hundreds = (parsedInt - (parsedInt % 100)) / 100;
  const ten = (parsedInt - ((hundreds * 100) + one)) / 10;
  const out = [letters[3][hundreds]];
  const SecondPart = ((ten * 10) + one);
  if (SecondPart > 0) {
    if (SecondPart < 10) {
      out.push(letters[0][SecondPart]);
    } else if (SecondPart <= 20) {
      out.push(letters[1][SecondPart - 10]);
    } else {
      out.push(letters[2][ten]);
      if (one > 0) {
        out.push(letters[0][one]);
      }
    }
  }
  return out.join(delimiter);
};

const convertDecimalPart = (decimalPart: any) => {
  decimalPart = decimalPart.replace(/0*$/, "");
  if (decimalPart === '') {
    return '';
  }

  if (decimalPart.length > 11) {
    decimalPart = decimalPart.substr(0, 11);
  }
  return ' ممیز ' + DigitToLetter(decimalPart) + ' ' + decimalSuffixes[decimalPart.length];
};

const DigitToLetter = (input: any) => {
  input = input.toString().replace(/[^0-9.-]/g, '');
  let isNegative = false;
  const floatParse = parseFloat(input);
  if (isNaN(floatParse)) {
    return zero;
  }
  if (floatParse === 0) {
    return zero;
  }
  if (floatParse < 0) {
    isNegative = true;
    input = input.replace(/-/g, '');
  }
  let decimalPart = '';
  let integerPart = input;
  let pointIndex = input.indexOf('.');
  if (pointIndex > -1) {
    integerPart = input.substring(0, pointIndex);
    decimalPart = input.substring(pointIndex + 1, input.length);
  }

  if (integerPart.length > 66) {
    return 'خارج از محدوده';
  }
  const slicedNumber = prepareNumber(integerPart);
  const Output = [];
  const SplitLength = slicedNumber.length;
  for (let i = 0; i < SplitLength; i += 1) {
    const SectionTitle = letters[4][SplitLength - (i + 1)];
    const converted = threeNumbersToLetter(slicedNumber[i]);
    if (converted !== '') {
      Output.push(converted + SectionTitle);
    }
  }
  if (decimalPart.length > 0) {
    decimalPart = convertDecimalPart(decimalPart);
  }
  return (isNegative ? negative : '') + Output.join(delimiter) + decimalPart;
};

const arabicNumbers = "٠١٢٣٤٥٦٧٨٩";
const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
const englishNumbers = "0123456789";
const arabicChars = ["ي", "ك", "‍", "دِ", "بِ", "زِ", "ذِ", "ِشِ", "ِسِ", "ى", "ة"];
const persianChars = ["ی", "ک", "", "د", "ب", "ز", "ذ", "ش", "س", "ی", "ه"];
const keyboardPersianChars = ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ", "ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ", "ظ", "ط", "ز", "ر", "ذ", "د", "پ", "و", "؟", "ئ"];
const keyboardEnglishChars = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "\\", ",", "?", "m"];

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

  public toDecodedUrl(): Persian {
    var old = "";
    while (old != this.text) {
      old = this.text;
      this.text = this.text.replace(/(http\S+?)\%20/g, '$1\u200c\u200c\u200c_\u200c\u200c\u200c');
    }
    this.text = this.text.replace(/(http\S+)/g, function (s, p) {
      return decodeURI(p);
    });
    this.text = this.text.replace(/\u200c\u200c\u200c_\u200c\u200c\u200c/g, '%20');
    return this;
  }

  public fixHalfSpace() {
    let pattern;
    pattern = /((\s\u0645\u06CC)+( )+([\u0600-\u06EF]{1,}){1,})/g;
    this.text = this.text.replace(new RegExp(pattern), "$2\u200C$4");
    pattern = /(([\u0600-\u06EF]{1,})+( )+(ای|ایی|اند|ایم|اید|ام){1})/g;
    this.text = this.text.replace(new RegExp(pattern), "$2\u200C$4");
    return this;
  }

  public convertNumberToLetter(): Persian {
    this.text = DigitToLetter(this.text)
    return this;
  }

  public value(): string {
    return this.text;
  }
}

