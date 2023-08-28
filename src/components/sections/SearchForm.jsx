import React from 'react';

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__container'>
        <input className='search-form__input' type='text' placeholder='Фильм' required></input>
        <button className='search-form__button' type='submit'>
          Поиск
        </button>
      </form>
      <div className='search-form__checkbox-container'>
        <input type='checkbox' id='switch' className='search-form__checkbox' />
        <label htmlFor='switch' className='search-form__toggle-switch'></label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
