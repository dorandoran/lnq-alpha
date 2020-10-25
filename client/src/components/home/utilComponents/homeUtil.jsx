import { SCREEN_WIDTH } from '@util'

export const calcTileDimension = ({ column, tier }) => {
  const margin = SCREEN_WIDTH / 100
  const width = (SCREEN_WIDTH - margin * 3) / 2
  let styles = {
    width,
    height: width,
    marginBottom: margin
  }

  if (tier) {
    styles.height = width * 2
  }

  if (column === 'right') {
    styles.marginRight = margin
    styles.marginLeft = margin / 2
  } else {
    styles.marginRight = margin / 2
    styles.marginLeft = margin
  }

  return styles
}

export const createColumns = () => {

}