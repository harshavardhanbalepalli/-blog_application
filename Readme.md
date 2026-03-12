--Using bootstrap for css from cdn links..
--Using mongoose for the database..
    -Schema is going to be like this..
        -fullName
        -email
        -salt
        -password
        
        -slat and pepper method for hashing of password
        -----> To hash the password we generate a random string and put it along with the password using CryptoHmac(salt is the random string generated here..)

        -profile url(with default image)
        -role of type enum with only user and admin (user is going to be the default)
        -timestamps at the end..
        

while signing in 
    --To handle sign in we are using virtual function defined in the model section
    --find the user using email in our data base
    --using the salt hash the password entered by the user
    --now match the two hashes if they match sign him up
    ---> if everthing matches then we will return the user object with password, salt marked as undefined..

Using JWT for Authentication..