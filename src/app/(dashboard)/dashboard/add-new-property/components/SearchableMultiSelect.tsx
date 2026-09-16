"use client";

import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useClickAway } from "react-use";
import { PropertyFormData } from "@/schemas/validationSchema";
import { ChevronDown, Search, X } from "lucide-react";

type SearchableMultiSelectProps = {
  name: "approvalTypes";
  options: readonly string[];
  placeholder?: string;
};

function asSelected(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
}

export default function SearchableMultiSelect({
  name,
  options,
  placeholder = "Select",
}: SearchableMultiSelectProps) {
  const { control } = useFormContext<PropertyFormData>();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useClickAway(wrapRef, () => setOpen(false));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = asSelected(field.value);
        const listOptions = [
          ...options,
          ...selected.filter((item) => !options.includes(item)),
        ];
        const visibleOptions = listOptions.filter((item) =>
          item.toLowerCase().includes(query.trim().toLowerCase()),
        );

        const commit = (next: string[]) => {
          field.onChange(next);
        };

        const toggle = (item: string) => {
          commit(
            selected.includes(item)
              ? selected.filter((value) => value !== item)
              : [...selected, item],
          );
        };

        const remove = (item: string) => {
          commit(selected.filter((value) => value !== item));
        };

        return (
          <div className="searchable-multi-select" ref={wrapRef}>
            <div
              className={`searchable-multi-select__trigger${open ? " is-open" : ""}`}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={open}
              tabIndex={0}
              onClick={() => setOpen((current) => !current)}
              onBlur={field.onBlur}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpen((current) => !current);
                }
                if (event.key === "Escape") setOpen(false);
              }}
            >
              <span className="searchable-multi-select__values">
                {selected.length === 0 ? (
                  <span className="searchable-multi-select__placeholder">
                    {placeholder}
                  </span>
                ) : (
                  selected.map((item) => (
                    <span key={item} className="searchable-multi-select__chip">
                      {item}
                      <button
                        type="button"
                        className="searchable-multi-select__chip-remove"
                        aria-label={`Remove ${item}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          remove(item);
                        }}
                      >
                        <X size={12} strokeWidth={2.5} />
                      </button>
                    </span>
                  ))
                )}
              </span>
              <ChevronDown
                className="searchable-multi-select__caret"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>

            {open ? (
              <div className="searchable-multi-select__panel">
                <div className="searchable-multi-select__search">
                  <Search size={16} strokeWidth={2} aria-hidden="true" />
                  <input
                    type="text"
                    value={query}
                    placeholder="Search approval types"
                    aria-label="Search approval types"
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.preventDefault();
                      if (event.key === "Escape") setOpen(false);
                    }}
                    autoFocus
                  />
                </div>
                <ul className="searchable-multi-select__list" role="listbox" aria-multiselectable="true">
                  {visibleOptions.length === 0 ? (
                    <li className="searchable-multi-select__empty">No matches</li>
                  ) : (
                    visibleOptions.map((item) => {
                      const checked = selected.includes(item);
                      const inputId = `${name}-${item.replace(/\s+/g, "-").toLowerCase()}`;
                      return (
                        <li key={item} role="option" aria-selected={checked}>
                          <label htmlFor={inputId}>
                            <input
                              id={inputId}
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggle(item)}
                            />
                            <span>{item}</span>
                          </label>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            ) : null}
          </div>
        );
      }}
    />
  );
}
