import { Injectable } from '@angular/core';
import { atl } from './dictionary';
import { full } from './dictionary';

@Injectable()
export class LoremGenService {
    getLorem(paragraphs:number, style:string): Promise<string[]> {
        let dictionary = full
        if (style === 'dirty') {
            dictionary = atl;
        }
        let lorem = generator(paragraphs, dictionary, style);
        return Promise.resolve(lorem);
    }
}

var generator = function (paragraphs: number, dictionary:string[], style:string) {
    let count = paragraphs;
    let units = 'paragraphs';
    let sentenceLowerBound = 5;
    let sentenceUpperBound = 15;
    let paragraphLowerBound = 5;
    let paragraphUpperBound = 15;
    let format = 'array';
    let words = dictionary;
    let random = Math.random
    let suffix = '\n';

    var randomInteger = function (min:number, max:number) {
        return Math.floor(random() * (max - min + 1) + min);
    };

    var randomWord = function (words:string[]) {
        return words[randomInteger(0, words.length - 1)];
    };

    var randomSentence = function (words:string[], lowerBound:number, upperBound:number) {
        var sentence = ''
            , bounds = { min: 0, max: randomInteger(lowerBound, upperBound) };

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

    var randomParagraph = function (words:string[], lowerBound:number, upperBound:number, sentenceLowerBound:number, sentenceUpperBound:number) {
        var paragraph = ''
            , bounds = { min: 0, max: randomInteger(lowerBound, upperBound) };

        while (bounds.min < bounds.max) {
            paragraph = paragraph + '. ' + randomSentence(words, sentenceLowerBound, sentenceUpperBound);
            bounds.min = bounds.min + 1;
        }

        if (paragraph.length) {
            paragraph = paragraph.slice(2);
            paragraph = paragraph + '.';
        }

        return paragraph;
    }

    var iter = 0
        , bounds = { min: 0, max: count }
        , string = ''
        , array = []
        , prefix = ''
        , openingTag
        , closingTag;

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
                } else if (bounds.min < bounds.max - 1) {
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
        } else if (string.indexOf('.') == 0 || string.indexOf(' ') == 0) {
            pos = 1;
        }

        string = string.slice(pos);

        // if (units == 'sentences') {
        //     string = string + '.';
        // }
    }

    if (style === 'clean'){
        array[0] = 'ATLorem ipsum dolor sit amet ' + array[0].charAt(0).toLowerCase() + array[0].slice(1);
        string = 'ATLorem ipsum dolor sit amet ' + string.charAt(0).toLowerCase() + string.slice(1);
    }

    if (format === 'array'){
        return array;
    } else {
        return string;
    }
};