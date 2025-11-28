'use client'

import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";

import outsideClickHandle from "@/common/ElementOutsideClick";
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function SearchBox({ showSearch, setShowSearch }) {
  const { register, handleSubmit } = useForm();
  const wrapperRef = useRef(null);
  outsideClickHandle(wrapperRef, () => {
    setShowSearch(false);
  });
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <CSSTransition
      in={showSearch}
      unmountOnExit
      timeout={200}
      classNames="search-box"
    >
      <div ref={wrapperRef} className="search-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="What are you looking for?"
            name="search"
            {...register('search', { required: true })}
          />
          <button>
            <Icon.MagnifyingGlass weight="bold" className="text-2xl" />
          </button>
        </form>
      </div>
    </CSSTransition>
  );
}
