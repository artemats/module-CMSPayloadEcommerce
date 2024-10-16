import { PRODUCT_CATEGORIES } from '@/config'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'

type Param = string | string[] | undefined

interface IProductsPage {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProductsPage = ({ searchParams }: IProductsPage) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)
  console.log('ProductsPage, sort ', sort)
  console.log('ProductsPage, category ', category)

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category,
  )?.label

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? 'Browse assets'}
        query={{
          category,
          limit: 40,
          sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  )
}

export default ProductsPage
