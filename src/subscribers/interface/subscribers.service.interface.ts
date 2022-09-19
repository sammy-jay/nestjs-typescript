import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import Subscriber from '../subscriber.service';

export default interface SubscribersService {
  addSubscriber(subscriber: CreateSubscriberDto): Promise<Subscriber>;
  getAllSubscribers(params: any): Promise<{ data: Subscriber[] }>;
}
