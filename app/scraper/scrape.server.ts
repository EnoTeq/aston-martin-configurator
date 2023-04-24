import { chromium, devices } from 'playwright';

const REGEX = /https:\/\/configurator.api-services.astonmartin.com\/rules\/configuration\/(.+)\?.*/

// VV0WK3LR4T
export async function getCarConfiguration(code: string): Promise<{jsonResponse: ConfiguratorResult, requestUrl: string, model: string}> {
  const browser = await chromium.launch();
  const context = await browser.newContext(devices['Desktop Edge']);
  const page = await context.newPage();

  const responsePromise = page.waitForResponse('https://configurator.api-services.astonmartin.com/rules/configuration/**/*')

  await page.goto(`https://my.astnmrt.in/${code}`);
  const response = await responsePromise;
  const url = response.request().url()
  const model = url.match(REGEX)!![1]

  const json = (await response.json()) as ConfiguratorResult

  await context.close();
  await browser.close();

  return {
    jsonResponse: json,
    requestUrl: url,
    model
  }
}

export function toCsv(jsonResponse: ConfiguratorResult): string[][] {
  let result: string[][] = []
  for (const group of jsonResponse.config) {
    walk(group, result, [group.name])
  }
  const headers = ['grouping', 'code', 'name']
  result = [headers, ...result]
  return result
}

function walk(content: Content, res: string[][] = [], current: string[] = []): void {
  if (content.content == null && content.selected) {
    const {code, name} = content
    res.push([...current, code!!, name])
    return
  }

  if (content.selected != null && !content.selected) {
    return
  }

  if (!content.content) {
    return
  }

  for (const curr of content.content) {
    let newCurrent = current.slice()
    if (curr.content != null) {
      const { name } = curr
      newCurrent = [[...newCurrent, name].join(' -- ')]
    }
    walk(curr, res, newCurrent);
  }
}

export interface ConfiguratorResult {
  config: Config[]
  options: any[]
  materials: any[]
  errors: any[]
}

export interface Config {
  type: string
  name: string
  sortOrder: number
  content: Content[]
  meta?: {[key: string]: string}
  visibleUI?: boolean
}

export interface Content {
  type: string
  name: string
  sortOrder: number
  mandatory?: boolean
  selected?: boolean
  content?: Content[]
  beautyshot?: Beautyshot
  meta?: {[key: string]: string}
  code?: string
  subType?: string
  active?: boolean
  conflicts?: any[]
  visibleUI?: boolean
}

interface Beautyshot {
  cameraId: string
}
