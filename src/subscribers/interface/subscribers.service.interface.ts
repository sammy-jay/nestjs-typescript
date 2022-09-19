import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import Subscriber from '../subscriber.service';

export default interface SubscribersSrevice {
  addSubscriber(subscriber: CreateSubscriberDto): Promise<Subscriber>;
  getAllSubscribers(params: any): Promise<{ data: Subscriber[] }>;
}
