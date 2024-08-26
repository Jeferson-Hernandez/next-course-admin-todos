import * as yup from 'yup';
import { Todo } from '@prisma/client';

import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma'

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async(id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: id
    }
  })

  return todo
}

export async function GET(request: Request, { params }: Segments) {

  const todo = getTodo(params.id)

  if (!todo) {
    return NextResponse.json({
      msg: `Todo con id ${params.id} no encontrado`
    }, { status: 404 })
  }

  return NextResponse.json(todo)
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional()
})

export async function PUT(request: Request, { params }: Segments) {

  const { id } = params

  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json({
      msg: `Todo con id ${id} no encontrado`
    }, { status: 404 })
  }

  try {
    const { description, complete, ...rest } = await putSchema.validate(await request.json())

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { description, complete }
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}