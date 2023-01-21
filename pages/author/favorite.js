import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getFavoriteAuthors } from '../../api/authorData';
import AuthorCard from '../../components/AuthorCard';

export default function GetFavoriteAuthors() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);

  const getFavAuthors = () => {
    getFavoriteAuthors(user.uid).then(setAuthors);
  };
  useEffect(() => {
    getFavAuthors();
  }, []);

  return (
    <div>{authors.map((author) => (
      <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getFavAuthors} />
    ))}
    </div>
  );
}
