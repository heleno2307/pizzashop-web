import { expect, test } from '@playwright/test'

test('update profile', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()
  await page.getByLabel('Nome').fill('John Doe')
  await page.getByLabel('Descrição').fill('Testando')
  await page.getByRole('button', { name: 'Salvar' }).click()

  const toast = page.getByText('Perfil atualizado com sucesso!')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)

  await page.getByRole('button', { name: 'Cancelar' }).click()

  expect(page.getByRole('button', { name: 'John Doe' })).toBeVisible()
})
