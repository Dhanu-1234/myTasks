import './index.css'

const TagItem = props => {
  const {tagDetails, isActive, onChangeTag} = props
  const {optionId, displayText} = tagDetails
  const btnClsName = isActive === true ? 'active-btn' : 'inactive-btn'
  const onClicked = () => {
    onChangeTag(optionId)
  }

  return (
    <li className="tag-item">
      <button type="button" className={btnClsName} onClick={onClicked}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
