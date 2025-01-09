import { expect, test } from 'vitest';
import parse from '../../src/core/parse.js';

const example1 = '[[["example","例子",null,null,10],[null,null,null,"Lìzi"]],[["noun",["example","case","instance"],[["example",["例","例子","范例","榜样","典范","例证"],null,0.2649736],["case",["外壳","例","案件","案","壳体","例子"],null,0.015666196],["instance",["例子","例","事例","比方","详","故"],null,0.0037210477]],"例子",1]],"zh-CN",null,null,[["例子",null,[["example",1000,true,false,[10,3],null,[[3]]],["examples",0,true,false,[8]]],[[0,2]],"例子",0,0]],1,[],[["zh-CN"],null,[1],["zh-CN"]]]';

test('parse - should parse the synonyms for response body', async () => {
    const result = parse(JSON.parse(example1));
    const expected = [
        '例',
        '例子',
        '范例',
        '榜样',
        '典范',
        '例证',
    ];
    expect(result.from.synonyms).toStrictEqual(expected);
});

const example2 = '[[["example","example",null,null,3,null,null,[[]],[[["af64405095a399ceb1e05c7abb7cda66","zh_en_2023q1.md"]]]]],null,"zh-CN",null,null,[["example",null,[["example",0,true,false,[3],null,[[3]]],["Example",0,true,false,[8]]],[[0,7]],"example",0,0]],1,[],[["en"],null,[1],["en"]]]';

test('parse - should parse the didYouMean of source language code for response body', async () => {
    const result = parse(JSON.parse(example2));
    expect(result.from.language.didYouMean).toBe(true);
});

const example3 = '[[["谢谢","Thank you",null,null,10],[null,null,"Xièxiè"]],[["感叹词",["谢谢!"],[["谢谢!",["Thank you!"],null,0.56978285]],"Thank you!",9]],"en",null,null,[["Thank you",null,[["谢谢",1000,true,false,[10,8]],["谢谢你",1000,true,false,[10,3],null,[[3]]]],[[0,9]],"Thank you",0,0]],0.7924534,["<b><i>Thank</i></b> you","Thank you",[1],null,null,true],[["en"],null,[0.7924534],["en"]],null,null,null,[["惊叹词",[["a polite expression used when acknowledging a gift, service, or compliment, or accepting or refusing an offer.","m_en_gbus1044390.004","thank you for your letter"]],"thank you",17],["名词",[["an instance or means of expressing thanks.","m_en_gbus1044390.008","Lucy planned a party as a thank you to the nurses"]],"thank you",1]]]';

test('parse - should parse the autoCorrected for response body', async () => {
    const result = parse(JSON.parse(example3));
    expect(result.from.text.autoCorrected).toBe(true);
});

const example4 = '[[["谢谢你","Thunk you",null,null,3,null,null,[[]],[[["6ffafab0da7e640be86ac09d0d5e539c","en_zh_2023q1.md"]]]],[null,null,"Xièxiè nǐ"]],null,"en",null,null,[["Thunk you",null,[["谢谢你",0,true,false,[3],null,[[3]]],["谢谢您",0,true,false,[8]]],[[0,9]],"Thunk you",0,0]],1,["<b><i>Thank</i></b> you","Thank you",[1],null,null,false],[["en"],null,[1],["en"]]]';

test('parse - should parse the didYouMean of source text for response body', async () => {
    const result = parse(JSON.parse(example4));
    expect(result.from.text.didYouMean).toBe(true);
});

const example5 = '[[["例子","example",null,null,10],[null,null,"Lìzi","iɡˈzampəl"]],[["名词",["例","例子","范例","榜样","典范","例证","事例","表率","例题","表","模范","标兵","譬","范","样子","标杆","鉴","法","训","师"],[["例",["example","case","instance","regulation","precedent","rule"],null,0.20961139],["例子",["example","case","instance"],null,0.075916216],["范例",["example","paradigm","model","exemplification","pattern"],null,0.0052475184],["榜样",["example","model","pattern","exemplar","sample","prototype"],null,0.002292471],["典范",["model","example"],null,0.0010495697],["例证",["illustration","example","case"],null,0.0010172778],["事例",["case","example","instance"],null,0.00051151944],["表率",["example","model"],null,0.00013767359],["例题",["example"],null,0.0001234098],["表",["table","list","meter","watch","surface","example"],null,0.000105558],["模范",["model","example","exemplar","paragon","pattern","paradigm"],null,0.000053077896],["标兵",["model","pacesetter","example","parade guards"],null,0.00001983376],["譬",["analogy","example"],null,0.000014064242],["范",["model","limits","pattern","example"],null,0.000007071945],["样子",["appearance","looks","manner","shape","aspect","example"],null,0.000004222851],["标杆",["model","example","surveyor\'s pole"],null,0.0000033931562],["鉴",["warning","mirror","ancient bronze mirror","reflection","reflexion","example"],null,2.7420907e-7],["法",["law","France","way","rule","dharma","example"],null,1.8266262e-7],["训",["instruction","example","pattern"],null,1.8266262e-7],["师",["division","teacher","master","expert","example","model"],null,9.1848534e-8]],"example",1]],"en",null,null,[["example",null,[["例子",1000,true,false,[10,3],null,[[3]]],["例",1000,true,false,[2]],["示例",0,true,false,[8]]],[[0,7]],"example",0,0]],1,[],[["en"],null,[1],["en"]],null,null,[["名词",[[["specimen","sample","exemplar","exemplification","instance","case","representative case","typical case","case in point","illustration"],"m_en_gbus0339130.007"],[["precedent","lead","guide","model","pattern","blueprint","template","paradigm","exemplar","ideal","standard","parallel case","role model"],"m_en_gbus0339130.014"]],"example",1]],[["名词",[["a thing characteristic of its kind or illustrating a general rule.","m_en_gbus0339130.007","it\'s a good example of how European action can produce results"],["a person or thing regarded in terms of their fitness to be imitated or the likelihood of their being imitated.","m_en_gbus0339130.014","it is vitally important that parents should set an example"]],"example",1],["动词",[["be illustrated or exemplified.","m_en_gbus0339130.016","the extent of Allied naval support is exampled by the navigational specialists provided"]],"example",2]],[[["it\'s a good <b>example</b> of how European action can produce results",null,null,null,null,"m_en_gbus0339130.007"],["it is vitally important that parents should set an <b>example</b>",null,null,null,null,"m_en_gbus0339130.014"],["she followed her brother\'s <b>example</b> and deserted her family",null,null,null,null,"m_en_gbus0339130.014"]]]]';

test('parse - should parse the sentences for response body', async () => {
    const result = parse(JSON.parse(example5));
    const expected = [
        'it\'s a good [example] of how European action can produce results',
        'it is vitally important that parents should set an [example]',
        'she followed her brother\'s [example] and deserted her family',
    ];
    expect(result.from.sentences).toStrictEqual(expected);
});

test('parse - should return error object if parameter is exceptional', async () => {
    try {
        parse(undefined as any);
    } catch (err) {
        expect((
            err as Error
        ).message).toBe('EPARSE');
    }
});
