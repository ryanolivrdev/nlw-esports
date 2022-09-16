import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { CaretDown, Check, GameController } from 'phosphor-react'
import { Input } from './Form/input'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Game {
  id: string
  title: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setVoiceChannel] = useState(false)
  const [selectGame, setSelectGame] = useState('')

  useEffect(() => {
    api('/games').then(({ data }) => {
      setGames(data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await api.post(`/games/${selectGame}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hoursStart,
        hourEnd: data.hoursEnd,
        // eslint-disable-next-line object-shorthand
        useVoiceChannel: useVoiceChannel,
      })

      alert('Anúncio criado com sucesso!')
    } catch (err) {
      alert('erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/80 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3x font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root onValueChange={setSelectGame}>
              <Select.Trigger
                name="game"
                id="game"
                className={`bg-zinc-900 py-3 px-4 rounded text-small flex mt-4 justify-between ${
                  selectGame ? 'text-white' : 'text-zinc-500'
                }`}>
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.SelectIcon>
                  <CaretDown size={24} className="text-zinc-400" />
                </Select.SelectIcon>
              </Select.Trigger>

              <Select.Portal className="mt-9">
                <Select.SelectContent className="bg-zinc-900 rounded overflow-hidden">
                  <Select.SelectViewport className=" ">
                    {games.map((game) => {
                      return (
                        <Select.SelectItem
                          className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                          value={game.id}
                          key={game.id}>
                          <Select.SelectItemText>
                            {game.title}
                          </Select.SelectItemText>
                        </Select.SelectItem>
                      )
                    })}
                  </Select.SelectViewport>
                </Select.SelectContent>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              name="name"
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name="discord" id="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekdays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}>
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}>
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}>
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sabado"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}>
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hoursStart"
                  id="hoursStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hoursEnd"
                  id="hoursEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 items-center flex gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setVoiceChannel(true)
                } else {
                  setVoiceChannel(false)
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900">
              <Checkbox.CheckboxIndicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.CheckboxIndicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
