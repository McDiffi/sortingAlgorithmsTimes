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

    console.log(i + ' ' + max);
    console.log(input);
    if (max != i) {
        [input[i], input[max]] = [input[max], input[i]];
        console.log(input);
        heap_root(input, max);
    }
}

function heapSort(input) {
    var start = performance.now();

    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i--) {
        heap_root(input, i);
    }

    for (i = input.length - 1; i > 0; i--) {
        [input[0], input[i]] = [input[i], input[0]];
        array_length--;

        heap_root(input, 0);
    }
    return performance.now() - start;
}

function InsertionSort(items) {
    var i, len = items.length,
        tmp, j;

    for (i = 1; i < len; i++) {
        tmp = items[i];
        j = i;
        while (j > 0 && items[j - 1] > tmp) {
            items[j] = items[j - 1];
            j--;
        }
        items[j] = tmp;
    }
    return items;
}

function countingSort(arr) {
    return arr.reduce((acc, v) => (acc[v] = (acc[v] || 0) + 1, acc), []).reduce((acc, n, i) => acc.concat(Array(n).fill(i)), []);
}


function insertionSort(array) {
    var length = array.length;

    for (var i = 1; i < length; i++) {
        var temp = array[i];
        for (var j = i - 1; j >= 0 && array[j] > temp; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = temp;
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


function radixBucketSort(arr) {
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {},
        buckets = {},
        num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10; // radix sort uses ten buckets

    // find the relevant radices to process for efficiency        
    for (idx1 = 0; idx1 < len1; idx1++) {
        radices[arr[idx1].toString().length] = 0;
    }

    // loop for each radix. For each radix we put all the items
    // in buckets, and then pull them out of the buckets.
    for (radix in radices) {
        // put each array item in a bucket based on its radix value
        len1 = arr.length;
        for (idx1 = 0; idx1 < len1; idx1++) {
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
        for (idx2 = 0; idx2 < len2; idx2++) {
            // only process buckets with items
            if (buckets[idx2] != null) {
                currBucket = buckets[idx2];
                // insert all bucket items into array
                len1 = currBucket.length;
                for (idx3 = 0; idx3 < len1; idx3++) {
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

            while (j >= increment && arr[j - increment] > temp) {
                arr[j] = arr[j - increment];
                j = j - increment;
            }

            arr[j] = temp;
        }

        if (increment == 2) {
            increment = 1;
        } else {
            increment = parseInt(increment * 5 / 11);
        }
    }
    return arr;
}

function Cocktail_sort(arr) {
    var swapped;
    do {
        for (var i = 0; i < arr.length - 2; i++) {
            if (arr[i] > arr[i + 1]) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
        swapped = false;
        for (i = arr.length - 2; i > 0; i--) {
            if (arr[i] > arr[i + 1]) {
                var temp1 = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp1;
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}

function randomNumber(quantity) {
    var table = [];
    for (var x = 0; x <= quantity; x++) {
        table.push(Math.floor((Math.random() * 1000) + 1));
    }
    return table;
}

function combsort(arr) {
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
            if (arr[front] > arr[back]) {
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