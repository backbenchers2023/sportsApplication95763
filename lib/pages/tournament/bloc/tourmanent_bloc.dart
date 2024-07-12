import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'tourmanent_event.dart';
part 'tourmanent_state.dart';

class TourmanentBloc extends Bloc<TourmanentEvent, TourmanentState> {
  TourmanentBloc() : super(TourmanentInitial()) {
    on<TourmanentEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
