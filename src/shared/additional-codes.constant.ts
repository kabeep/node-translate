type AdditionalCodeOptions = typeof additionalCodes;
export type AdditionalCode = keyof AdditionalCodeOptions;
export type AdditionalCodeOption = AdditionalCodeOptions[AdditionalCode];
export type AdditionalName = AdditionalCodeOptions[AdditionalCode]['name'];
export type AdditionalNativeName = AdditionalCodeOptions[AdditionalCode]['nativeName'];

const additionalCodes = {
    bho: {
        name: 'Bhojpuri',
        nativeName: 'भोजपुरी',
    },
    ceb: {
        name: 'Cebuano',
        nativeName: 'Cebuan',
    },
    'zh-cn': {
        name: 'Chinese (Simplified)',
        nativeName: '简体中文',
    },
    'zh-tw': {
        name: 'Chinese (Traditional)',
        nativeName: '簡體中文',
    },
    doi: {
        name: 'Dogri',
        nativeName: '𑠖𑠵𑠌𑠤𑠮',
    },
    fil: {
        name: 'Filipino',
        nativeName: 'Wikang Filipino',
    },
    haw: {
        name: 'Hawaiian',
        nativeName: 'ʻŌlelo Hawaiʻi',
    },
    iw: {
        name: 'Hebrew',
        nativeName: 'עִבְרִית',
    },
    hmn: {
        name: 'Hmong',
        nativeName: 'Mong',
    },
    ilo: {
        name: 'Ilocano',
        nativeName: 'Ilokano',
    },
    jw: {
        name: 'Javanese',
        nativeName: 'basa jawa',
    },
    gom: {
        name: 'Konkani',
        nativeName: 'कोंकणी',
    },
    kri: {
        name: 'Krio',
        nativeName: 'Krio',
    },
    ckb: {
        name: 'Kurdish',
        nativeName: 'کوردی',
    },
    mai: {
        name: 'Maithili',
        nativeName: 'मैथिली',
    },
    'mni-mtei': {
        name: 'Meitei (Manipuri)',
        nativeName: 'ꯃꯩꯇꯩꯂꯣꯟ',
    },
    lus: {
        name: 'Mizo',
        nativeName: 'Mizo ṭawng',
    },
    nso: {
        name: 'Northern Sotho',
        nativeName: 'Sesotho sa Lebowa',
    },
} as const;

export default additionalCodes;
