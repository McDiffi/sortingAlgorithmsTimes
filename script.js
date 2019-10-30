function perfBubbleSort(items){
    var start = performance.now();
    var length = items.length;
    for(var i = (length-1); i >= 0 ;i--){
        for(var j = length - i; j > 0 ;j--){
            if(items[j] < items[j-1]){
                [items[j], items[j-1]] = [items[j-1], items[j]];
            }
        }
    }
    return performance.now() - start;
}

//CoctailSort (also know as bidirectional bubblesor, shaker sort) with Performance Measure (mix of Bubble sort and Comprasion Sort)
function perfCocktailSort(arr) {
    var start = performance.now();
    var swapped;
    do {
    for(var i = 0; i < arr.length - 2; i++) {
        if(arr[i] > arr[i+1]) {
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        swapped = true;
        }
    }	
    if(!swapped) {
        break;
    }
    swapped = false;
    for( i = arr.length - 2; i > 0; i--) {
        if(arr[i] > arr[i+1]) {
        var temp1 = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp1;
        swapped = true;
        }
    }
    } while(swapped);
    //return arr;
    return performance.now() - start;
}

//CombSort with Performance Measure (something like bubble sort but with increased gap)
function perfCombSort(arr){
    var start = performance.now();
    function is_array_sorted(arr) {
        var sorted = true;
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                sorted = false;
                break;
            }
        }
        return sorted;
    }
    var iteration_count = 0;
    var gap = arr.length - 2;
    var decrease_factor = 1.25;

    // Repeat iterations Until array is not sorted
    while (!is_array_sorted(arr)) {
        // If not first gap  Calculate gap
        if (iteration_count > 0)
        gap = (gap == 1) ? gap : Math.floor(gap / decrease_factor);

    // Set front and back elements and increment to a gap
        var front = 0;
        var back = gap;
        while (back <= arr.length - 1) {
            // Swap the elements if they are not ordered
            if (arr[front] > arr[back]){
                var temp = arr[front];
                arr[front] = arr[back];
                arr[back] = temp;
            }
            // Increment and re-run swapping
            front += 1;
            back += 1;
        }
        iteration_count += 1;
    }
    //return arr;
    return performance.now() - start;
}

//Selection Sort returning Performance Measure
function perfSelectionSort(items){
    var start = performance.now();                
    var minIdx,
    len = items.length;
    for(var i = 0; i < len; i++){
        minIdx = i;
        for(var  j = i+1; j<len; j++){
            if(items[j]<items[minIdx]){
                minIdx = j;
            }
        }
        [items[i], items[minIdx]] = [items[minIdx], items[i]];
    }
    return performance.now() - start;
}            

//InsertionSort with Performance Measure
function perfInsertionSort(items){
    var start = performance.now();
    var i, len = items.length, tmp, j;

    for(i = 1; i<len; i++){
        tmp = items[i];
        j = i;
        while(j>0 && items[j-1]>tmp){
            items[j] = items[j-1];
            j--;
        }
        items[j] = tmp;
    }
    return performance.now() - start;
}

//GnomeSort (also known as stupid sort) with Performance Measure (Simmilar to insertion sort with swaps form Bubble Sort)
function perfGnomeSort(arr) {
    var start = performance.now();
    function moveBack(i) {
        for( ; i > 0 && arr[i-1] > arr[i]; i--)
        {
            var t = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = t;
        }
    }
    for (var i = 1; i < arr.length; i++) {
        if (arr[i-1] > arr[i]) moveBack(i);
    }
    //return arr;
    return performance.now() - start;
}
   
//CountingSort with Performance Measure (rename to perfCountingSort to use, before that change name of other CountingSort function)
function perCountingSort(arr){
    var start = performance.now();
    arr.reduce( (acc, v) => (acc[v] = (acc[v] || 0) + 1, acc), [] ).reduce( (acc, n, i) => acc.concat(Array(n).fill(i)), [] ); 
    return performance.now() - start;
}

//Alternative CountingSort Algorithm (better to understand) <- this one is better for optimalization, the one above has larger time consumption
function perfCountingSort(arr){
    var start = performance.now();
    var helper = []; // This helper will note how many times each number appeared in the arr
                    // Since JS arrary is an object and elements are not continuously stored, helper's Space Complexity minor that n
    for(var i = 0; i<arr.length; i++){
        if(!helper[arr[i]]){
            helper[arr[i]] = 1;
        }else{
            helper[arr[i]] += 1;
        }
    }

    var newArr = []; 
    for(i in helper){
        while(helper[i]>0){
            newArr.push(parseInt(i));
            helper[i]--;
        }
    }
    //return newArr; 
    return performance.now() - start;
}

//BucketSort (with Insertion Sort Use) with PerformanceMeasure
function insertionSort(array) {
    var length = array.length;
    
    for(var i = 1; i < length; i++) {
    var temp = array[i];
    for(var j = i - 1; j >= 0 && array[j] > temp; j--) {
        array[j+1] = array[j];
    }
    array[j+1] = temp;
    }
    
    return array;
}

function perfBucketSort(array, bucketSize) {
    var start = performance.now();

    if (array.length === 0) {
        return array;
    }

    // Determine minimum and maximum values
    var i;
    var minValue = array[0];
    var maxValue = array[0];
    for (i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }

    // Initialise buckets
    var DEFAULT_BUCKET_SIZE = 5;
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    // Distribute input array values into buckets
    for (i = 0; i < array.length; i++) {
        buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
    }

    // Sort buckets and place back into input array
    array.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);
        for (var j = 0; j < buckets[i].length; j++) {
            array.push(buckets[i][j]);
        }
    }

    //return array;
    return performance.now()-start;
}

//RadixSortLSD (Least Significant Digit) with Performance Measure
var extractDigit = function( a, bitMask, shiftRightAmount ) {
    var digit = (a & bitMask) >>> shiftRightAmount; // extract the digit we are sorting based on
    return digit;
}
// June 2017 Victor J. Duvanenko High Performance LSD Radix Sort for arrays of unsigned integers (https://duvanenko.tech.blog/2017/06/15/faster-sorting-in-javascript/)
function perfRadixSortLSD(_input_array) {
    var start = performance.now();
    var numberOfBins = 256;
    var Log2ofPowerOfTwoRadix = 8;
    var _output_array = new Array(_input_array.length);
    var count = new Array(numberOfBins);
    var _output_array_has_result = false;

    var bitMask = 255;
    var shiftRightAmount = 0;

    var startOfBin = new Array( numberOfBins );
    var endOfBin   = new Array( numberOfBins );

    while( bitMask != 0 ) // end processing digits when all the mask bits have been processed and shifted out, leaving no bits set in the bitMask
    {
        for (var i = 0; i < numberOfBins; i++ )
            count[ i ] = 0;
        for (var _current = 0; _current < _input_array.length; _current++ ) // Scan the array and count the number of times each digit value appears - i.e. size of each bin
            count[ extractDigit( _input_array[ _current ], bitMask, shiftRightAmount ) ]++;

        startOfBin[ 0 ] = endOfBin[ 0 ] = 0;
        for( var i = 1; i < numberOfBins; i++ )
            startOfBin[ i ] = endOfBin[ i ] = startOfBin[ i - 1 ] + count[ i - 1 ];
        for ( var _current = 0; _current < _input_array.length; _current++ )
            _output_array[ endOfBin[ extractDigit( _input_array[ _current ], bitMask, shiftRightAmount ) ]++ ] = _input_array[ _current ];

        bitMask <<= Log2ofPowerOfTwoRadix;
        shiftRightAmount += Log2ofPowerOfTwoRadix;
        _output_array_has_result = !_output_array_has_result;

        var tmp = _input_array, _input_array = _output_array, _output_array = tmp; // swap input and output arrays
    }
    if ( _output_array_has_result )
        for ( var _current = 0; _current < _input_array.length; _current++ ) // copy from output array into the input array
            _input_array[ _current ] = _output_array[ _current ];

    //return _input_array;
    return performance.now() - start;
}

//RadixBucketSort with Performance Measure
function perfRadixBucketSort (arr) {
    var start = performance.now();
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10;  // radix sort uses ten buckets

    // find the relevant radices to process for efficiency        
    for (idx1 = 0;idx1 < len1;idx1++) {
    radices[arr[idx1].toString().length] = 0;
    }

    // loop for each radix. For each radix we put all the items
    // in buckets, and then pull them out of the buckets.
    for (radix in radices) {          
    // put each array item in a bucket based on its radix value
    len1 = arr.length;
    for (idx1 = 0;idx1 < len1;idx1++) {
        curr = arr[idx1];
        // item length is used to find its current radix value
        currLen = curr.toString().length;
        // only put the item in a radix bucket if the item
        // key is as long as the radix
        if (currLen >= radix) {
        // radix starts from beginning of key, so need to
        // adjust to get redix values from start of stringified key
        radixKey = curr.toString()[currLen - radix];
        // create the bucket if it does not already exist
        if (!buckets.hasOwnProperty(radixKey)) {
            buckets[radixKey] = [];
        }
        // put the array value in the bucket
        buckets[radixKey].push(curr);          
        } else {
        if (!buckets.hasOwnProperty('0')) {
            buckets['0'] = [];
        }
        buckets['0'].push(curr);          
        }
    }
    // for current radix, items are in buckets, now put them
    // back in the array based on their buckets
    // this index moves us through the array as we insert items
    idx1 = 0;
    // go through all the buckets
    for (idx2 = 0;idx2 < len2;idx2++) {
        // only process buckets with items
        if (buckets[idx2] != null) {
        currBucket = buckets[idx2];
        // insert all bucket items into array
        len1 = currBucket.length;
        for (idx3 = 0;idx3 < len1;idx3++) {
            arr[idx1++] = currBucket[idx3];
        }
        }
    }
    buckets = {};
    }
    return performance.now()-start;
}

//Merge Sort without Performance Measure
function mergeSort (arr) {
    if (arr.length === 1) {
        // return once we hit an array with a single item
        return arr
    }

    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side

    return merge(
        mergeSort(left),
        mergeSort(right)
    )
}

// compare the arrays item by item and return the concatenated result
function merge (left, right) {
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft])
        indexLeft++
        } else {
        result.push(right[indexRight])
        indexRight++
        }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

//Merge Sort Performance Measure
function perfMergeSort(items){
    var start = performance.now();   
    score = mergeSort(items);
    //console.log(score);
    return performance.now() - start;
}

//ShellSort with Performance Measure
function perfShellSort(arr) {
    var start = performance.now();
    var increment = arr.length / 2;
    while (increment > 0) {
        for (i = increment; i < arr.length; i++) {
            var j = i;
            var temp = arr[i];
    
            while (j >= increment && arr[j-increment] > temp) {
                arr[j] = arr[j-increment];
                j = j - increment;
            }
    
            arr[j] = temp;
        }
    
        if (increment == 2) {
            increment = 1;
        } else {
            increment = parseInt(increment*5 / 11);
        }
    }
    //return arr;
    return performance.now() - start;
}

//Heapsort with Performance Measure
function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        [input[i],input[max]] = [input[max],input[i]];
        heap_root(input, max);
    }
}

function perfHeapSort(input) {
    var start = performance.now();

    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i);
    }

    for (i = input.length - 1; i > 0; i--) {
        [input[0],input[i]] = [input[i],input[0]];
        array_length--;
    
    
        heap_root(input, 0);
    }
    return performance.now() - start;
}

//QuickSort without performance measure
function quickSort(items){
    if(items.length <=1) return items;

    var len = items.length;
    var pivotPos = Math.floor(len / 2);
    var pivotVal = items[pivotPos];
    var less = [],
        more = [],
        same = [];

    for(var i = 0; i < len ;i++){
        if(items[i] === pivotVal) same.push(items[i]);
        else if(items[i] < pivotVal) less.push(items[i]);
        else more.push(items[i]);
    }
    return quickSort(less).concat(same, quickSort(more));
} 

//Quick Sort with Performance Measure
function perfQuickSort(items){
    var start = performance.now();   
    score = quickSort(items);
    //console.log(score);
    return performance.now() - start;
}

//Quick Sort with Performance Measure
function perfJavaScriptDefaultSort(items){
    var start = performance.now();   
    score = items.sort();
    //console.log(score);
    return performance.now() - start;
}

//Return number between 1 and 10 000
function randomNumber(quantity){
    var table = [];
    for(var x = 0; x < quantity; x++){
       table.push(Math.floor((Math.random() * 10000) + 1));
    }
    return table;
}

function doPerformanceMeasure(sortingMethodName, quantity){
    var randomTime = performance.now();
    var table = randomNumber(quantity)
    randomTime = performance.now() - randomTime;
    return [window["perf"+sortingMethodName](table), randomTime];
}

$(function(){

    $('.start-button').click(function(){
        $('.start-button').hide();
        $('#loading-box').toggle();
        setTimeout(performanceTest, 400);
    });

    function performanceTest(){
        //Test Bench

        var sortingMethods = ['BubbleSort','CocktailSort','CombSort','SelectionSort','InsertionSort','GnomeSort','CountingSort','BucketSort','RadixSortLSD','RadixBucketSort','MergeSort','ShellSort','HeapSort','QuickSort','JavaScriptDefaultSort']; //add function name for another sorting method (function name should be like ex:'perfQuickSort' and should return execution time)

        $('#sorts thead').append('<tr><th scope="col">Sorting numbers amount</th></tr><tr><th scope="col">Amount: </th></tr>');

        sortingMethods.forEach(function(element) {
            $('#sorts thead tr:nth-child(1)').append('<th colspan="3" scope="col">'+element+'</th>');
            $('#sorts thead tr:nth-child(2)').append('<th scope="col">Sorting time [ms]:</th><th scope="col">Randomize time [ms]:</th><th scope="col">Total Time [ms]: </th>');
        }, this);

        var averageSort = 0;
        var averageRandom = 0;
        var operations = 0;
        var testPerSort = 250; //increse for more acurrate calculations (also drastically increase execution time)
        var ElapsedTime = 0;
        var charData = new Array();
        charData.push( ['Amount'].concat(sortingMethods));

        for(var i=5; i<=3000;){
            var htmlCode = '<tr><th scope="row">'+ i +'</th>';
            var  subCharData = new Array();
            subCharData.push(i);    

            sortingMethods.forEach(function(element) {

                for(var g=0; g<testPerSort ;g++){
                    test = doPerformanceMeasure(element, i);
                    averageSort +=parseFloat(test[0]);
                    averageRandom +=parseFloat(test[1]);
                    operations++;
                }

                ElapsedTime += averageRandom+averageSort;

                averageSort = averageSort/testPerSort;
                averageRandom = averageRandom/testPerSort;
                sum = averageRandom+averageSort;

                subCharData.push(averageSort); 

                htmlCode+='<td>'+averageSort+'</td>'+'<td>'+averageRandom+'</td>'+'<td>'+sum+'</td>';

            }, this);

            charData.push(subCharData);

            htmlCode+= '</tr>';
            $('#sorts tbody').append(htmlCode);

            if(i<20)i+=5;
            else if(i<100)i+=20;
            else if(i<1000)i+=100;
            else i+=1000;
        }
        $('#sorts').append('<thead><th>Operations done:</th><th>'+operations+'</th><th>Elapsed time:</th><th>'+ElapsedTime+'</th></th></thead>');

        //Our Whole Data for Chart Generation
        console.log(charData);

        //Google Chart
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            $('#curve_chart_big, #curve_chart, #curve_chart_small, #curve_chart_verry_small').css({
                'width':'100%',
                'height':'500px'
            });

            $('div.container-fluid').css({'overflow':'scroll'})

            var data = google.visualization.arrayToDataTable(charData);

            var options = {
                title: 'Sorts Performance 5 to 3000 elements',
                curveType: 'none',
                hAxis: {title: 'Amount', minValue: 5 }, 
                vAxis: {title: 'Time [ms]', minValue: 0},
                legend: { position: 'top', maxLines: 5 }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart_big'));
            chart.draw(data, options);

            var options = {
                title: 'Sorts Performance 5 to 3000 elements (with smaller time range)',
                curveType: 'none',
                hAxis: {title: 'Amount', minValue: 5 }, 
                vAxis: {title: 'Time [ms]', minValue: 0, viewWindow: {max: 2} },
                legend: { position: 'top', maxLines: 5 }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
            chart.draw(data, options);

            chart = new google.visualization.LineChart(document.getElementById('curve_chart_small'));
            options = {
                title: 'Sorts Performance 5 to 100 elements',
                curveType: 'none',
                hAxis: {title: 'Amount', minValue: 5}, 
                vAxis: {title: 'Time [ms]', minValue: 0},
                legend: { position: 'top', maxLines: 5 }
            };
            data = google.visualization.arrayToDataTable(charData.slice(0,9));
            chart.draw(data, options);

            chart = new google.visualization.LineChart(document.getElementById('curve_chart_verry_small'));
            options = {
                title: 'Sorts Performance 5 to 40 elements (with smaller time range)',
                curveType: 'none',
                hAxis: {title: 'Amount', minValue: 5}, 
                vAxis: {title: 'Time [ms]', minValue: 0, viewWindow: {max: 0.04} },
                legend: { position: 'top', maxLines: 5 }
            };
            data = google.visualization.arrayToDataTable(charData.slice(0,6));
            chart.draw(data, options);
        }
        //End Google Chart

        $('#loading-box').hide();
    }
});


// Split the array into halves and merge them recursively 
            //Heapsort with Performance Measure
            function heap_root(input, i) {
              var left = 2 * i + 1;
              var right = 2 * i + 2;
              var max = i;

              if (left < array_length && input[left] > input[max]) {
                  max = left;
              }

              if (right < array_length && input[right] > input[max]) {
                  max = right;
              }

              console.log(i+' '+max);
              console.log(input);
              if (max != i) {
                  [input[i],input[max]] = [input[max],input[i]];
                  console.log(input);
                  heap_root(input, max);
              }
          }

          function heapSort(input) {
            var start = performance.now();

            array_length = input.length;

            for (var i = Math.floor(array_length / 2); i >= 0; i--){
                heap_root(input, i);
            }

            for (i = input.length - 1; i > 0; i--) {
                [input[0],input[i]] = [input[i],input[0]];
                array_length--;
            
                heap_root(input, 0);
            }
            return performance.now() - start;
          }

          function InsertionSort(items){
            var i, len = items.length, tmp, j;

            for(i = 1; i<len; i++){
                tmp = items[i];
                j = i;
                while(j>0 && items[j-1]>tmp){
                    items[j] = items[j-1];
                    j--;
                }
                items[j] = tmp;
            }
            return items;
          }

          function countingSort(arr){
              return arr.reduce( (acc, v) => (acc[v] = (acc[v] || 0) + 1, acc), [] ).reduce( (acc, n, i) => acc.concat(Array(n).fill(i)), [] ); 
          }


          function insertionSort(array) {
            var length = array.length;
            
            for(var i = 1; i < length; i++) {
              var temp = array[i];
              for(var j = i - 1; j >= 0 && array[j] > temp; j--) {
                array[j+1] = array[j];
              }
              array[j+1] = temp;
            }
            
            return array;
          }

          function BucketSort(array, bucketSize) {
            if (array.length === 0) {
              return array;
            }

            // Determine minimum and maximum values
            var i;
            var minValue = array[0];
            var maxValue = array[0];
            for (i = 1; i < array.length; i++) {
              if (array[i] < minValue) {
                minValue = array[i];
              } else if (array[i] > maxValue) {
                maxValue = array[i];
              }
            }

            // Initialise buckets
            var DEFAULT_BUCKET_SIZE = 5;
            bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
            var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
            var buckets = new Array(bucketCount);
            for (i = 0; i < buckets.length; i++) {
              buckets[i] = [];
            }

            // Distribute input array values into buckets
            for (i = 0; i < array.length; i++) {
              buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
            }

            // Sort buckets and place back into input array
            array.length = 0;
            for (i = 0; i < buckets.length; i++) {
              insertionSort(buckets[i]);
              for (var j = 0; j < buckets[i].length; j++) {
                array.push(buckets[i][j]);
              }
            }

            return array;
          }


          function radixBucketSort (arr) {
            var idx1, idx2, idx3, len1, len2, radix, radixKey;
            var radices = {}, buckets = {}, num, curr;
            var currLen, radixStr, currBucket;

            len1 = arr.length;
            len2 = 10;  // radix sort uses ten buckets

            // find the relevant radices to process for efficiency        
            for (idx1 = 0;idx1 < len1;idx1++) {
              radices[arr[idx1].toString().length] = 0;
            }

            // loop for each radix. For each radix we put all the items
            // in buckets, and then pull them out of the buckets.
            for (radix in radices) {          
              // put each array item in a bucket based on its radix value
              len1 = arr.length;
              for (idx1 = 0;idx1 < len1;idx1++) {
                curr = arr[idx1];
                // item length is used to find its current radix value
                currLen = curr.toString().length;
                // only put the item in a radix bucket if the item
                // key is as long as the radix
                if (currLen >= radix) {
                  // radix starts from beginning of key, so need to
                  // adjust to get redix values from start of stringified key
                  radixKey = curr.toString()[currLen - radix];
                  // create the bucket if it does not already exist
                  if (!buckets.hasOwnProperty(radixKey)) {
                    buckets[radixKey] = [];
                  }
                  // put the array value in the bucket
                  buckets[radixKey].push(curr);          
                } else {
                  if (!buckets.hasOwnProperty('0')) {
                    buckets['0'] = [];
                  }
                  buckets['0'].push(curr);          
                }
              }
              // for current radix, items are in buckets, now put them
              // back in the array based on their buckets
              // this index moves us through the array as we insert items
              idx1 = 0;
              // go through all the buckets
              for (idx2 = 0;idx2 < len2;idx2++) {
                // only process buckets with items
                if (buckets[idx2] != null) {
                  currBucket = buckets[idx2];
                  // insert all bucket items into array
                  len1 = currBucket.length;
                  for (idx3 = 0;idx3 < len1;idx3++) {
                    arr[idx1++] = currBucket[idx3];
                  }
                }
              }
              buckets = {};
            }
          }

          function shellSort(arr) {
            var increment = arr.length / 2;
            while (increment > 0) {
                for (i = increment; i < arr.length; i++) {
                    var j = i;
                    var temp = arr[i];
            
                    while (j >= increment && arr[j-increment] > temp) {
                        arr[j] = arr[j-increment];
                        j = j - increment;
                    }
            
                    arr[j] = temp;
                }
            
                if (increment == 2) {
                    increment = 1;
                } else {
                    increment = parseInt(increment*5 / 11);
                }
            }
            return arr;
          }

          function Cocktail_sort(arr) {
            var swapped;
            do {
              for(var i = 0; i < arr.length - 2; i++) {
                if(arr[i] > arr[i+1]) {
                  var temp = arr[i];
                  arr[i] = arr[i+1];
                  arr[i+1] = temp;
                  swapped = true;
                }
              }	
              if(!swapped) {
                break;
              }
              swapped = false;
              for( i = arr.length - 2; i > 0; i--) {
                if(arr[i] > arr[i+1]) {
                  var temp1 = arr[i];
                  arr[i] = arr[i+1];
                  arr[i+1] = temp1;
                  swapped = true;
                }
              }
            } while(swapped);
            return arr;
          }

          function randomNumber(quantity){
            var table = [];
            for(var x = 0; x <= quantity; x++){
                table.push(Math.floor((Math.random() * 1000) + 1));
            }
            return table;
          }

          function combsort(arr){
            function is_array_sorted(arr) {
                var sorted = true;
                for (var i = 0; i < arr.length - 1; i++) {
                    if (arr[i] > arr[i + 1]) {
                        sorted = false;
                        break;
                    }
                }
                return sorted;
            }
            var iteration_count = 0;
            var gap = arr.length - 2;
            var decrease_factor = 1.25;
          
            // Repeat iterations Until array is not sorted
            while (!is_array_sorted(arr)) {
                // If not first gap  Calculate gap
                if (iteration_count > 0)
                  gap = (gap == 1) ? gap : Math.floor(gap / decrease_factor);
          
            // Set front and back elements and increment to a gap
                var front = 0;
                var back = gap;
                while (back <= arr.length - 1) {
                    // Swap the elements if they are not ordered
                    if (arr[front] > arr[back]){
                        var temp = arr[front];
                        arr[front] = arr[back];
                        arr[back] = temp;
                    }
                    // Increment and re-run swapping
                    front += 1;
                    back += 1;
                }
                iteration_count += 1;
            }
            return arr;
          }
var list = randomNumber(100);
console.log(combsort(list));
console.log(list) // [ 1, 2, 2, 3, 3, 3, 5, 6, 7, 8 ];
