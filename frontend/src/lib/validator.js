function isValidNumber(val) {
  return !Number.isNaN(Number(val));
}
function isValidYear(year)
{
    let currentYear=new Date().getFullYear();
    if(year<=currentYear)
    {
        return true;
    }
    return false;
}
export const validateBook = (data) => {
  const errors = {};

  if (!data.title || data.title.length > 255) {
    errors.title = 'Book title must be between 1 and 255 characters';
  }

  if (!data.author || data.author.length<2 || data.author.length > 255) {
    errors.author = 'Author name must be between 2 and 255 characters';
  }

  if (!data.genre || data.genre.length > 255) {
    errors.genre = 'Book genre must be between 1 and 255 characters';
  }

  if(!isValidNumber(data.price) || data.price<0)
  {
    errors.price= 'Invalid Price';
  }
  // errors.publication_year= 'Invalid Year';
  if(!isValidYear(data.publication_year))
  {
    errors.publication_year= 'Invalid Year';
  }
  return errors;
}