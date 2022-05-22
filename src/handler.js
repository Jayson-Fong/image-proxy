/**
 * Respond with hello worker text
 * @param {Request} request
 */
export async function handleRequest(request) {
  const url = new URL(request.url)
  const pathParts = url.pathname.match(/^\/([^\/]*)\/([^\/]*)\/(.*)$/)

  if (pathParts == null || !url.searchParams.get('proxy-fetch-token')) {
    return new Response('Invalid Request', {
      headers: { 'content-type': 'text/plain' },
    })
  }

  const searchParams = new URLSearchParams(url.search)
  searchParams.delete('proxy-fetch-token')

  const searchParamsStr = searchParams.toString()
  const queryString = searchParamsStr ? '?' + searchParamsStr : ''
  const fetchUrl =
    pathParts[1] + '://' + pathParts[2] + '/' + pathParts[3] + queryString

  const headRequest = new Request(fetchUrl, { method: 'HEAD' })
  const headResponse = await fetch(headRequest)

  const validMimetypes = /image\/png|image\/jpeg|image\/gif/
  const isValidMimetype = validMimetypes.test(
    headResponse.headers.get('Content-Type'),
  )

  if (!isValidMimetype) {
    return new Response(
      'Forbidden Content Type: ' + headResponse.headers.get('Content-Type'),
      {
        headers: { 'content-type': 'text/plain' },
      },
    )
  }

  const fetchRequest = new Request(fetchUrl)

  return fetch(fetchRequest)
}
