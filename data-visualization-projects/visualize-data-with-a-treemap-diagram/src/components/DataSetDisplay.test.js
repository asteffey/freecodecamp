import React, { useRef } from 'react'
import { render, wait } from '@testing-library/react'
import DataSetDisplay from './DataSetDisplay'
import useDimensions from 'react-use-dimensions'
import treemap from './treemap.d3'
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

const props = {
  title: 'a title',
  description: 'a description',
  url: 'https://some.url/path'
}

const fetchedData = {
  name: 'fake',
  children: [
    { name: 'category', children: [] }
  ]
}

jest.mock('./treemap.d3')
jest.mock('react-use-dimensions')

beforeEach(() => {
  useDimensions.mockImplementation(() => [useRef(), { height: 100 }])
  treemap.mockReturnValue(() => {})
  fetch.mockResponse(JSON.stringify(fetchedData))
})

it('should have a title with a corresponding id="title".', async () => {
  const { container } = render(<DataSetDisplay {...props} />)

  const title = container.querySelector('#title')
  expect(title).toBeInTheDocument()

  await wait()
})

it('displays correct title', async () => {
  const { getByText } = render(<DataSetDisplay {...props} />)

  expect(getByText(props.title)).toBeInTheDocument()

  await wait()
})

it('displays correct description', async () => {
  const { getByText } = render(<DataSetDisplay {...props} />)

  expect(getByText(props.description)).toBeInTheDocument()

  await wait()
})

it('should have a description with a corresponding id="description"', async () => {
  const { container } = render(<DataSetDisplay {...props} />)

  const description = container.querySelector('#description')
  expect(description).toBeInTheDocument()

  await wait()
})

it('fetches correct url', async () => {
  render(<DataSetDisplay {...props} />)

  expect(fetch.mock.calls[0][0]).toBe(props.url)

  await wait()
})

it('passes right args to treemap', async () => {
  render(<DataSetDisplay {...props} />)

  await wait()

  expect(treemap).toBeCalledWith(fetchedData)
})
