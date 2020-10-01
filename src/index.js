module.exports = function toReadable (number) {
    var string = number.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';

    /* Удаляем пробелы и запятые */
    string = string.replace(/[, ]/g,"");

    /* Число ноль? */
    if( parseInt( string ) === 0 ) {
        return 'zero';
    }
    
    /* Массив единиц в виде слов */
    units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
    
    /* Массив десятков в виде слов */
    tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
    
    /* Массив сотен в виде слов */
    scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];
    
    /* Разделить аргумент пользователя на 3-значные блоки справа налево */
    start = string.length;
    chunks = [];
    while( start > 0 ) {
        end = start;
        chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
    }
    
    /* Проверяю, достаточно ли у функции масштабных слов */
    chunksLen = chunks.length;
    if( chunksLen > scales.length ) {
        return '';
    }
    
    /* Строка в каждое целое число в каждом блоке */
    words = [];
    for( i = 0; i < chunksLen; i++ ) {
        
        chunk = parseInt( chunks[i] );
        
        if( chunk ) {
            
            /* Разделить часть на массив отдельных целых чисел */
            ints = chunks[i].split( '' ).reverse().map( parseFloat );
        
            /* Если целое число десятков равно 1, то есть 10, то прибавьте 10 к целому числу единиц. */
            if( ints[1] === 1 ) {
                ints[0] += 10;
            }
            
            /* Добавить масштабное слово, если чанк не равен нулю и существует элемент массива */
            if( ( word = scales[i] ) ) {
                words.push( word );
            }
            
            /* Добавить единичное слово, если элемент массива существует */
            if( ( word = units[ ints[0] ] ) ) {
                words.push( word );
            }
            
            /* Добавить слово десятков, если элемент массива существует */
            if( ( word = tens[ ints[1] ] ) ) {
                words.push( word );
            }
            
            
            
            /* Добавить сотню, если элемент массива существует */
            if( ( word = units[ ints[2] ] ) ) {
                words.push( word + ' hundred' );
            }
            
        }
        
    }
    
    return words.reverse().join( ' ' );
    
}

