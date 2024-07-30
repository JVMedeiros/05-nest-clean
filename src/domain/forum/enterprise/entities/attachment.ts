import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttatchmentProps {
  title: string
  link: string
}

export class Attatchment extends Entity<AttatchmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttatchmentProps, id?: UniqueEntityID) {
    const attatchment = new Attatchment(props, id)

    return attatchment
  }
}
