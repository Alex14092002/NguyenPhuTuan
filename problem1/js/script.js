// use loop
const sum_n_to_a_loop = (n) =>{
    let result = 0 // create result = 0 
    for(let i = 1 ; i <= n ; i++){
        result += i // browse from 1 to n and add up after each review
    }   
    
    return result // return result
}
sum_n_to_a_loop(10) // test function
console.log(sum_n_to_a_loop(10));





// use recursive
const sum_n_to_a_recursive = (n) =>{

    if (n === 1) {  // if n = 1 result is 1
        return 1;
      }
    // if n > 1 result = n + sum_n_to_a_recursive(n-1)
    return n + sum_n_to_a_recursive(n-1); // util n = 1 stop
      
}
sum_n_to_a_recursive(10) // test function
console.log(sum_n_to_a_recursive(10));




// use the arithmetic progression formula
const sum_n_to_math = (n) =>{
    return ((n * (n+1))/2) // return result of arithmetic progression formula
}
console.log(sum_n_to_math(10));