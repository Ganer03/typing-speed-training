import React from 'react'
import {
  Select,
  SelectItem,
  SharedSelection,
  Selection
} from '@nextui-org/react'
import { labelInterface } from '../../../constants'
export const SelectCustom = ({
  length,
  setLength,
  paramSelection,
  lableInterface,
  about
}: {
  length: Selection
  setLength: ((keys: SharedSelection) => void) | undefined
  paramSelection: 'multiple' | 'single'
  lableInterface: labelInterface[]
  about: string
}) => {
  return (
    <>
      <div className={'md:px-4 md:py-0 py-1 px-0 w-full'}>
        <Select
          label={`${about}`}
          selectionMode={paramSelection}
          placeholder={`Select ${about}`}
          selectedKeys={length}
          size="sm"
          onSelectionChange={setLength}
          disallowEmptySelection={true}
        >
          {lableInterface.map((word) => (
            <SelectItem key={word.key}>{word.lable}</SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}
