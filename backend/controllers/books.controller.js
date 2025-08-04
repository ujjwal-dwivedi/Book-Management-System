import { sql } from "../db.js";

export const getAllBooks=async (req,res)=>{
    try {
        const books=await sql`
            SELECT*FROM books
            ORDER BY created_at DESC
        `;

        if(!books)
        {
            return res.status(400).json({success:false, message:"No books found"});
        }

        res.status(200).json({success:true, data:books});

    } catch (error) {
        console.log("Error in getAllStudents", error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const getBook=async (req,res)=>{
    const bookId= parseInt(req.params.id);

    if(isNaN(bookId))
    {
        return res.status(400).json({success:false,message:"Invalid Book ID"});
    }
    try {
        const book=await sql`
           SELECT*FROM books WHERE book_id=${bookId}
        `;
        if(!book || book.length===0)
        {
            return res.status(404).json({success:false, message:"Book not found"});
        }

        res.status(200).json({success:true,data:book[0]});
    } catch (error) {
        console.log("Error in getStudent", error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const createBook=async(req,res)=>{
    const {title, author, genre, publication_year, price}=req.body;
    if(!title || !author || !genre || !publication_year || !price)
    {
        return res.status(400).json({success:false, message:"Please enter all the necessary details"});
    }
    if(price<0)
    {
        return res.status(400).json({success:false, message:"price can't be negative"});
    }
    const currentYear = new Date().getFullYear();
    if(publication_year>currentYear)
    {
        return res.status(400).json({success:false, message:"Invalid publication year"});
    }
    try {
        const newBook=await sql`
           INSERT INTO books(title, author, genre, publication_year, price)
           VALUES(${title},${author},${genre},${publication_year},${price})
           RETURNING*
        `;
        res.status(201).json({success:true, data: newBook[0]});
    } catch (error) {
        console.log("Error in createStudents", error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const updateBook=async(req,res)=>{
    const bookId = parseInt(req.params.id);
    const {title, author, genre, publication_year, price}=req.body;

    if (isNaN(bookId)) {
    return res.status(400).json({success:false, message:"Invalid book ID"});
  }

  let book;
  try {
    const result=await sql`
        SELECT*FROM books WHERE book_id=${bookId}
    `;
    if(result.length===0)
    {
        return res.status(404).json({success:false, message:"Book not found"});
    }
    book=result[0];
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message:"Database error while fetching book"});
  }

  const updatedTitle= title??book.title;
  const updatedAuthor= author??book.author;
  const updatedGenre= genre??book.genre;
  const updatedYear= publication_year??book.publication_year;
  const updatedPrice= price??book.price;

  if(updatedPrice<0)
  {
    return res.status(400).json({success:false, message:"price can't be negative"});
  }
  const currentYear = new Date().getFullYear();
  if(updatedYear>currentYear)
    {
        return res.status(400).json({success:false, message:"Invalid publication year"});
    }

try {
    const updatedBook = await sql`
        UPDATE books 
        SET title = ${updatedTitle},
            author = ${updatedAuthor},
            genre = ${updatedGenre},
            publication_year = ${updatedYear},
            price = ${updatedPrice},
            updated_at= CURRENT_TIMESTAMP
        WHERE book_id = ${bookId}
        RETURNING *
    `;
    res.status(200).json({ success: true, data: updatedBook[0] });
} catch (error) {
    console.log("Error in updateBook", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
}

}

export const deleteBook=async (req,res)=>{
    const bookId = parseInt(req.params.id);
    if(isNaN(bookId))
    {
        return res.status(400).json({success:false, message:"Invalid book ID"});
    }
    try {
        const deletedBook=await sql`
           DELETE FROM books WHERE book_id=${bookId}
           RETURNING*
        `;
        if(deletedBook.length===0)
        {
            return res.status(404).json({success:false, message:"Book not found"});
        }
        res.status(200).json({success:true,data:deletedBook[0]});
    } catch (error) {
        console.log("Error in deleteBook", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}