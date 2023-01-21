/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const updateOfAuthors = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={authorDetails.image} alt={authorDetails.first_name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {authorDetails.first_name} by {authorDetails.last_name}
            {authorDetails.favorite ? ' 🤍' : ''}
          </h5>
          Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
          <hr />
        </div>
      </div>
      <hr />
      <h3>
        These are the Books {authorDetails.first_name} {authorDetails.last_name} wrote:
      </h3>
      <div className="d-flex flex-column">
        {authorDetails.books?.map((bookObject) => (
          <BookCard key={bookObject.firebaseKey} bookObj={bookObject} onUpdate={updateOfAuthors} />
        ))}
      </div>
    </>
  );
}
