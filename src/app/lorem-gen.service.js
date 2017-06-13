"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var dictionary_1 = require("./dictionary");
var dictionary_2 = require("./dictionary");
var LoremGenService = (function () {
    function LoremGenService() {
    }
    LoremGenService.prototype.getLorem = function (paragraphs, style) {
        var dictionary = dictionary_2.full;
        if (style === 'dirty') {
            dictionary = dictionary_1.atl;
        }
        var lorem = generator(paragraphs, dictionary, style);
        return Promise.resolve(lorem);
    };
    return LoremGenService;
}());
LoremGenService = __decorate([
    core_1.Injectable()
], LoremGenService);
exports.LoremGenService = LoremGenService;
var generator = function (paragraphs, dictionary, style) {
    var count = paragraphs;
    var units = 'paragraphs';
    var sentenceLowerBound = 5;
    var sentenceUpperBound = 15;
    var paragraphLowerBound = 5;
    var paragraphUpperBound = 15;
    var format = 'array';
    var words = dictionary;
    var random = Math.random;
    var suffix = '\n';
    var randomInteger = function (min, max) {
        return Math.floor(random() * (max - min + 1) + min);
    };
    var randomWord = function (words) {
        return words[randomInteger(0, words.length - 1)];
    };
    var randomSentence = function (words, lowerBound, upperBound) {
        var sentence = '', bounds = { min: 0, max: randomInteger(lowerBound, upperBound) };
        while (bounds.min < bounds.max) {
            sentence = sentence + ' ' + randomWord(words);
            bounds.min = bounds.min + 1;
        }
        if (sentence.length) {
            sentence = sentence.slice(1);
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }
        return sentence;
    };
    var randomParagraph = function (words, lowerBound, upperBound, sentenceLowerBound, sentenceUpperBound) {
        var paragraph = '', bounds = { min: 0, max: randomInteger(lowerBound, upperBound) };
        while (bounds.min < bounds.max) {
            paragraph = paragraph + '. ' + randomSentence(words, sentenceLowerBound, sentenceUpperBound);
            bounds.min = bounds.min + 1;
        }
        if (paragraph.length) {
            paragraph = paragraph.slice(2);
            paragraph = paragraph + '.';
        }
        return paragraph;
    };
    var iter = 0, bounds = { min: 0, max: count }, string = '', array = [], prefix = '', openingTag, closingTag;
    if (format == 'html') {
        openingTag = '<p>';
        closingTag = '</p>';
    }
    while (bounds.min < bounds.max) {
        // switch (units.toLowerCase()) {
        //     case 'words':
        //         nextstring = randomWord(words);
        //         string = string + ' ' + nextstring
        //         array.push(nextstring);
        //         break;
        //     case 'sentences':
        //         nextstring = randomSentence(words, sentenceLowerBound, sentenceUpperBound);
        //         string = string + '. ' + nextstring;
        //         array.push(nextstring + '.');
        //         break;
        //  case 'paragraphs':
        var nextstring = randomParagraph(words, paragraphLowerBound, paragraphUpperBound, sentenceLowerBound, sentenceUpperBound);
        if (format == 'html') {
            nextstring = openingTag + nextstring + closingTag;
            if (bounds.min < bounds.max - 1) {
                nextstring = nextstring + suffix; // Each paragraph on a new line
            }
        }
        else if (bounds.min < bounds.max - 1) {
            nextstring = nextstring + suffix + suffix; // Double-up the EOL character to make distinct paragraphs, like carriage return
        }
        string = string + nextstring;
        array.push(nextstring);
        //         break;
        // }
        bounds.min = bounds.min + 1;
    }
    if (string.length) {
        var pos = 0;
        if (string.indexOf('. ') == 0) {
            pos = 2;
        }
        else if (string.indexOf('.') == 0 || string.indexOf(' ') == 0) {
            pos = 1;
        }
        string = string.slice(pos);
    }
    if (style === 'clean') {
        array[0] = 'ATLorem ipsum dolor sit amet ' + array[0].charAt(0).toLowerCase() + array[0].slice(1);
        string = 'ATLorem ipsum dolor sit amet ' + string.charAt(0).toLowerCase() + string.slice(1);
    }
    if (format === 'array') {
        return array;
    }
    else {
        return string;
    }
};
//# sourceMappingURL=lorem-gen.service.js.map