import React from 'react'
import Icon from '../core/Icon';

const Form = () => {
  return <form className='header__form'>
    <label className='header__form-label' htmlFor="header-search">
      <Icon>search</Icon>
      Поиск
    </label>
    <input className='header__form-input' type="text" name="search" id="header-search" />
  </form>
}

export default Form;