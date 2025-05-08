export const API_KEY = 'AIzaSyBONYSBjb4OZ6H4aHw61dEXNZzRC5XVxQc';

export const value_converter = (value)=>
{
    if(value>=1000000)
    {
        return Math.floor(value/1000000) + "M";
    }

    else if(value>=1000)
    {
        return Math.floor(value/1000) + "K";
    }

    else
    {
        return value;
    }
}