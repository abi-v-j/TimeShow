
# server/views.py  (drop-in replacement)
from urllib import request
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from server.models import *
import json
from django.db.models import F





@csrf_exempt
def District(request):
    if request.method == 'POST':
        tbl_district.objects.create(
                       district_name=request.POST['district_name'])
        return JsonResponse({'msg': "Instert SuccessFully"})
    else:
        data = list(tbl_district.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteDistrict(request, did):
    tbl_district.objects.get(id=did).delete()
    return JsonResponse({'data': list(tbl_district.objects.values())})


@csrf_exempt
def Admin(request):
    if request.method == 'POST':
        tbl_admin.objects.create(
            admin_id=request.POST['admin_id'],
            admin_name=request.POST['admin_name'],
            admin_email=request.POST['admin_email'],
            admin_password=request.POST['admin_password']
        )
        return JsonResponse({'msg': "Admin Registered Successfully"})
    else:
        data = list(tbl_admin.objects.values())
        return JsonResponse({'data': data})

@csrf_exempt
def DeleteAdmin(request, aid):
    tbl_admin.objects.get(id=aid).delete()
    return JsonResponse({'data': list(tbl_admin.objects.values())})

@csrf_exempt
def City(request):
    if request.method == 'POST':
        tbl_city.objects.create(
            city_name=request.POST['city_name'],
            district_id= tbl_district.objects.get(id=request.POST['district_id'])
        )
        return JsonResponse({'msg': "City Added Successfully"})
    else:
        data = list(tbl_city.objects.values())
        return JsonResponse({'data': data})
    




@csrf_exempt
def CityByDistrict(request, district_id):
    data = list(tbl_city.objects.filter(district_id=district_id).values())
    return JsonResponse({'data': data})




@csrf_exempt
def DeleteCity(request, cid):
    tbl_city.objects.get(id=cid).delete()
    return JsonResponse({'data': list(tbl_city.objects.values())})

@csrf_exempt
def Theater(request):
    if request.method == 'POST':
        tbl_theater.objects.create(
            theater_name=request.POST['theater_name'],
            theater_email=request.POST['theater_email'],
            theater_contact=request.POST['theater_contact'],
            theater_photo=request.FILES.get('theater_photo'),
            theater_proof=request.FILES.get('theater_proof'),
            city_id= tbl_city.objects.get(id=request.POST['city_id']),
            theater_password=request.POST['theater_password']
        )
        return JsonResponse({'msg': "Theater Added Successfully"})
    else:
        data = list(tbl_theater.objects.values())
        return JsonResponse({'data': data}) 
    
@csrf_exempt
def DeleteTheater(request, tid):
    tbl_theater.objects.get(id=tid).delete()
    return JsonResponse({'data': list(tbl_theater.objects.values())})

@csrf_exempt
def User(request):
    if request.method == 'POST':
        tbl_user.objects.create(
            user_name=request.POST['user_name'],
            user_email=request.POST['user_email'],
            user_password=request.POST['user_password'],
            user_contact=request.POST['user_contact']
        )
        return JsonResponse({'msg': "User Registered Successfully"})
    else:
        data = list(tbl_user.objects.values())
        return JsonResponse({'data': data})
@csrf_exempt
def DeleteUser(request, uid):
    tbl_user.objects.get(id=uid).delete()
    return JsonResponse({'data': list(tbl_user.objects.values())})

@csrf_exempt
def Booking(request):

    if request.method == 'POST':

        booking = tbl_booking.objects.create(
            user_id=tbl_user.objects.get(id=request.POST['user_id']),
            movie_id=tbl_movie.objects.get(id=request.POST['movie_id']),
            booking_amount=request.POST['booking_amount'],
            booking_todate=request.POST['booking_date'],
            booking_time=request.POST['booking_time'],
            booking_status=request.POST.get('booking_status', 0)
        )

        return JsonResponse({
            "msg": "Booking Successful",
            "booking_id": booking.id   # 🔥 THIS IS IMPORTANT
        })

    else:
        data = list(tbl_booking.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteBooking(request, bid):
    tbl_booking.objects.get(id=bid).delete()
    return JsonResponse({'data': list(tbl_booking.objects.values())})    

@csrf_exempt
def Genre(request):
    if request.method == 'POST':
        tbl_genre.objects.create(
            genre_name=request.POST['genre_name']
        )
        return JsonResponse({'msg': "Genre Added Successfully"})
    else:
        data = list(tbl_genre.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteGenre(request, gid):
    tbl_genre.objects.get(id=gid).delete()
    return JsonResponse({'data': list(tbl_genre.objects.values())}) 

@csrf_exempt
def EditGenre(request, gid):
    if request.method == 'PUT':
        
        tbl_genre.objects.filter(id=gid).update(genre_name=json.loads(request.body)['genre_name'])
    return JsonResponse({'data': list(tbl_genre.objects.values())})
    
@csrf_exempt
def Trailer(request):
    if request.method == 'POST':
        tbl_trailer.objects.create(
            trailer_file=request.POST['trailer_file'],
            trailer_description=request.POST['trailer_description']
        )
        return JsonResponse({'msg': "Trailer Added Successfully"})
    else:
        data = list(tbl_trailer.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteTrailer(request, trid):
    tbl_trailer.objects.get(id=trid).delete()
    return JsonResponse({'data': list(tbl_trailer.objects.values())})    

@csrf_exempt
def Review(request):
    if request.method == 'POST':
        tbl_review.objects.create(
            user_id= tbl_user.objects.get(id=request.POST['user_id']),
            movie_id= tbl_movie.objects.get(id=request.POST['movie_id']),
           review_content=request.POST['review_content'],
          
           review_datetime=request.POST['review_datetime']
        )
        return JsonResponse({'msg': "Review Added Successfully"})
    else:
        data = list(tbl_review.objects.values())
        return JsonResponse({'data': data})

@csrf_exempt
def DeleteReview(request, reid):
    tbl_review.objects.get(id=reid).delete()
    return JsonResponse({'data': list(tbl_review.objects.values())})    
    
@csrf_exempt
def Screentype(request):
    if request.method == 'POST':
        tbl_screentype.objects.create(
            screentype_name=request.POST['screentype_name']
        )
        return JsonResponse({'msg': "Screen Type Added Successfully"})
    else:
        data = list(tbl_screentype.objects.values())
        return JsonResponse({'data': data})    
    
@csrf_exempt
def DeleteScreentype(request, stid):
    tbl_screentype.objects.get(id=stid).delete()
    return JsonResponse({'data': list(tbl_screentype.objects.values())})  
  
@csrf_exempt
def EditScreentype(request, stid):
    if request.method == 'PUT':
        
        tbl_screentype.objects.filter(id=stid).update(screentype_name=json.loads(request.body)['screentype_name'])
    return JsonResponse({'data': list(tbl_screentype.objects.values())})
    
@csrf_exempt
def Complaint(request):
    if request.method == 'POST':
        tbl_complaint.objects.create(
            user_id=tbl_user.objects.get(id=request.POST['user_id']),
            theater_id=tbl_theater.objects.get(id=request.POST['theater_id']),
            complaint_title=request.POST['complaint_title'],
            complaint_reply=request.POST['complaint_reply'],
            complaint_date=request.POST['complaint_date'],
           
        )
        return JsonResponse({'msg': "Complaint Submitted Successfully"})
    else:
        data = list(tbl_complaint.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteComplaint(request, cid):
    tbl_complaint.objects.get(id=cid).delete()
    return JsonResponse({'data': list(tbl_complaint.objects.values())})    
    
@csrf_exempt
def Theatermovie(request):
    if request.method == 'POST':
        tbl_theatermovie.objects.create(
            theater_id=tbl_theater.objects.get(id=request.POST['theater_id']),
            movie_id=tbl_movie.objects.get(id=request.POST['movie_id']),
        )
        return JsonResponse({'msg': "Movie Added Successfully"})
    else:
        data = list(tbl_theatermovie.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteTheatermovie(request, tmid):
    tbl_theatermovie.objects.get(id=tmid).delete()
    return JsonResponse({'data': list(tbl_theatermovie.objects.values())})    

@csrf_exempt
def Movie(request):
    if request.method == 'POST':
        tbl_movie.objects.create(
            movie_title=request.POST['movie_title'],
            movie_description=request.POST['movie_description'],
            movie_duration=request.POST['movie_duration'],
            movie_language=request.POST['movie_language'],
            movie_poster=request.FILES['movie_poster'],
            movie_banner=request.FILES['movie_banner'],
           
        )
        return JsonResponse({'msg': "Movie Added Successfully"})
    else:
        data = list(tbl_movie.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteMovie(request, mid):
    tbl_movie.objects.get(id=mid).delete()
    return JsonResponse({'data': list(tbl_movie.objects.values())})    

@csrf_exempt
def Screen(request):
    if request.method == 'POST':
        tbl_screen.objects.create(
            theater_id=tbl_theater.objects.get(id=request.POST['theater_id']),
            screentype_id=tbl_screentype.objects.get(id=request.POST['screentype_id']),
            screen_seatno=request.POST['screen_seatno'],
            Screen_name=request.POST['screen_name']            
        )
        return JsonResponse({'msg': "Screen Added Successfully"})
    else:
        data = list(tbl_screen.objects.values(
            *[f.name for f in tbl_screen._meta.fields],
            screentype_name=F('screentype_id__screentype_name')
            ))
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteScreen(request, sid):
    tbl_screen.objects.get(id=sid).delete()
    return JsonResponse({'data': list(tbl_screen.objects.values())})    


@csrf_exempt
def Shows(request):
    if request.method == 'POST':
        tbl_shows.objects.create(
            movie_id=tbl_movie.objects.get(id=request.POST['movie_id']),
            screen_id=tbl_screen.objects.get(id=request.POST['screen_id']),
            showtime=request.POST['showtime']
        )
        return JsonResponse({'msg': "Show Added Successfully"})
    else:
        data = list(tbl_shows.objects.values())
        return JsonResponse({'data': data}) 
    
@csrf_exempt
def DeleteShows(request, shid):
    tbl_shows.objects.get(id=shid).delete()
    return JsonResponse({'data': list(tbl_shows.objects.values())})    



@csrf_exempt
def ScreenSeat(request):

    if request.method == 'POST':

        tbl_screenseat.objects.create(
            screen_id=tbl_screen.objects.get(id=request.POST['screen_id']),
            seattype_id=tbl_seattype.objects.get(id=request.POST['seattype_id']),
            rows=request.POST['rows'],
            columns=request.POST['columns'],
            aisles=request.POST.get('aisles', ''),
            screenseat_total=request.POST['screenseat_total'],
            screenseat_amountper=request.POST['screenseat_amountper']
        )

        return JsonResponse({'msg': "Layout Saved Successfully"})

    else:

        data = tbl_screenseat.objects.select_related(
            'screen_id', 'seattype_id'
        ).values(
            'id',
            'rows',
            'columns',
            'aisles',
            'screenseat_total',
            'screenseat_amountper',
            'screen_id__Screen_name',
            'seattype_id__seattype_name'
        )

        return JsonResponse({'data': list(data)})
@csrf_exempt
@csrf_exempt
def DeleteScreenSeat(request, ssid):
    tbl_screenseat.objects.get(id=ssid).delete()
    return JsonResponse({'data': list(tbl_screenseat.objects.values())})
    
# @csrf_exempt
# def SeatBooking(request):

#     if request.method == 'POST':

#         screenseat_id = request.POST['screenseat_id']
#         seat_number = request.POST['seatbooking_number']
#         booking_id = request.POST['booking_id']

#         exists = tbl_seatbooking.objects.filter(
#             screenseat_id=screenseat_id,
#             seatbooking_number=seat_number
#         ).exists()

#         if exists:
#             return JsonResponse({'msg': 'Seat already booked'}, status=400)

#         tbl_seatbooking.objects.create(
#             screenseat_id=tbl_screenseat.objects.get(id=screenseat_id),
#             seatbooking_number=seat_number,
#             booking_id=tbl_booking.objects.get(id=booking_id)
#         )

#         return JsonResponse({'msg': "Seat Booking Successful"})
#     else:
#         data = list(tbl_seatbooking.objects.values())
#         return JsonResponse({'data': data})


@csrf_exempt
def SeatBooking(request):
    if request.method == 'POST':

        screenseat_id = request.POST['screenseat_id']   # layout id
        seat_number   = request.POST['seatbooking_number']
        booking_id    = request.POST['booking_id']

        booking = tbl_booking.objects.get(id=booking_id)

        # ✅ check seat only for SAME movie + SAME time + SAME date + SAME screen seat
        exists = tbl_seatbooking.objects.filter(
            screenseat_id=screenseat_id,
            seatbooking_number=seat_number,
            booking_id__movie_id=booking.movie_id,
            booking_id__booking_time=booking.booking_time,
            booking_id__booking_todate=booking.booking_todate,
            booking_id__booking_status__in=[0, 1],   # created or paid
        ).exists()

        if exists:
            return JsonResponse({'msg': f'Seat {seat_number} already booked'}, status=400)

        tbl_seatbooking.objects.create(
            screenseat_id=tbl_screenseat.objects.get(id=screenseat_id),
            seatbooking_number=seat_number,
            booking_id=booking
        )

        return JsonResponse({'msg': "Seat Booking Successful"})

    else:
        data = list(tbl_seatbooking.objects.values())
        return JsonResponse({'data': data})
    
@csrf_exempt
def DeleteSeatBooking(request, sbid):
    tbl_seatbooking.objects.get(id=sbid).delete()
    return JsonResponse({'data': list(tbl_seatbooking.objects.values())})

@csrf_exempt
def Feedback(request):
    if request.method == 'POST':
        tbl_feedback.objects.create(
            user_id=tbl_user.objects.get(id=request.POST['user_id']),
            feedback_content=request.POST['feedback_content'],
            feedback_date=request.POST['feedback_date']
         )
        return JsonResponse({'msg': "Feedback Submitted Successfully"})
    else:
        data = list(tbl_feedback.objects.values())
        return JsonResponse({'data': data}) 

@csrf_exempt
def DeleteFeedback(request, fid):
    tbl_feedback.objects.get(id=fid).delete()
    return JsonResponse({'data': list(tbl_feedback.objects.values())})

@csrf_exempt
def SeatType(request):
    if request.method == 'POST':
        tbl_seattype.objects.create(        
            seattype_name=request.POST['seattype_name']
         )
        return JsonResponse({'msg': "Seat Type Added Successfully"})
    else:
        data = list(tbl_seattype.objects.values())
        return JsonResponse({'data': data})   

@csrf_exempt
def DeleteSeatType(request, stid):
    tbl_seattype.objects.get(id=stid).delete()
    return JsonResponse({'data': list(tbl_seattype.objects.values())})   

@csrf_exempt
def EditSeatType(request, stid):
    if request.method == 'PUT':
        
        tbl_seattype.objects.filter(id=stid).update(seattype_name=json.loads(request.body)['seattype_name'])
    return JsonResponse({'data': list(tbl_seattype.objects.values())})

@csrf_exempt
def Login(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        email    = body.get('email')
        password = body.get('password')

        
        user = tbl_user.objects.filter(user_email=email, user_password=password).first()
        theater = tbl_theater.objects.filter(theater_email=email, theater_password=password).first()
        admin = tbl_admin.objects.filter(admin_email=email, admin_password=password).first()

        if user:
            return JsonResponse({'role': 'user',  'id': user.id, 'name': user.user_name,
                                 'message': 'Login successful'})
        elif admin:
            return JsonResponse({'role': 'admin',  'id': admin.id, 'name': admin.admin_name,
                                 'message': 'Login successful'})
        elif theater:
            return JsonResponse({'role': 'theater',  'id': theater.id, 'name': theater.theater_name,
                                 'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid email or password'}, status=401)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

   
@csrf_exempt
def theaterprofile(request, id):
    if request.method == 'GET':

        theater = tbl_theater.objects.get(id=id)
        return JsonResponse({
            'theater_name': theater.theater_name,
            'theater_email': theater.theater_email,
            'theater_contact': theater.theater_contact,
            'city_id': theater.city_id.city_name,
            'district_id': theater.city_id.district_id.district_name,
           
        })
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def theatereditprofile(request, id):
    if request.method == 'GET':

        theater = tbl_theater.objects.get(id=id)
        return JsonResponse({
            'theater_name': theater.theater_name,
            'theater_email': theater.theater_email, 
            'theater_contact': theater.theater_contact,
              
        })
    
    if request.method == 'PUT':
        body = json.loads(request.body)
        theater_name = body.get('theater_name')
        theater_email = body.get('theater_email')
        theater_contact = body.get('theater_contact')
     

        theater = tbl_theater.objects.get(id=id)
        theater.theater_name = theater_name
        theater.theater_email = theater_email
        theater.theater_contact = theater_contact
       
        theater.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    
@csrf_exempt
def changepassword(request, id):
    if request.method == 'PUT':
        body = json.loads(request.body)
        old_password = body.get('old_password')
        new_password = body.get('new_password')
        confirm_password = body.get('confirm_password')
        theater = tbl_theater.objects.get(id=id)

        if theater.theater_password == old_password:
            if new_password != confirm_password:
                theater.theater_password = new_password
                theater.save()
                return JsonResponse({'message': 'Password changed successfully'})
            else:
                return JsonResponse({'message': 'New password and confirm password do not match'}, status=400)
        else:
            return JsonResponse({'message': 'Old password is incorrect'}, status=400)

@csrf_exempt
def MovieDetails(request, mid):
    if request.method == 'GET':
        movie = tbl_movie.objects.filter(id=mid).values().first()
        return JsonResponse(movie)
    
@csrf_exempt
def userprofile(request, id):
    if request.method == 'GET':

        user = tbl_user.objects.get(id=id)
        return JsonResponse({
            'user_name':user.user_name,
            'user_email': user.user_email,
            'user_contact': user.user_contact,
            'user_password': user.user_password,
           
        })
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def usereditprofile(request, id):
    if request.method == 'GET':

        user = tbl_user.objects.get(id=id)
        return JsonResponse({
            'user_name':user.user_name,
            'user_email': user.user_email,
            'user_contact': user.user_contact,
            'user_password': user.user_password,
           
        })
    
    if request.method == 'PUT':
        body = json.loads(request.body)
        user_name = body.get('user_name')
        user_email = body.get('user_email')
        user_contact = body.get('user_contact')
     

        user = tbl_user.objects.get(id=id)
        user.user_name = user_name
        user.user_email = user_email
        user.user_contact = user_contact
       
        user.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    
@csrf_exempt
def userchangepassword(request, id):
    if request.method == 'PUT':
        body = json.loads(request.body)
        old_password = body.get('old_password')
        new_password = body.get('new_password')
        confirm_password = body.get('confirm_password')
        user = tbl_user.objects.get(id=id)

        if user.user_password == old_password:
            if new_password != confirm_password:
                user.user_password = new_password
                user.save()
                return JsonResponse({'message': 'Password changed successfully'})
            else:
                return JsonResponse({'message': 'New password and confirm password do not match'}, status=400)
        else:
            return JsonResponse({'message': 'Old password is incorrect'}, status=400)

from django.db.models import F
from collections import defaultdict

@csrf_exempt
def MovieTheatersWithShows(request, mid):

    shows = tbl_shows.objects.filter(movie_id=mid).values(
        'showtime',
        'screen_id',
        theater_id=F('screen_id__theater_id__id'),
        theater_name=F('screen_id__theater_id__theater_name')
    )

    theater_dict = defaultdict(list)

    for show in shows:
        theater_dict[(show['theater_id'], show['theater_name'], show['screen_id'])].append(show['showtime'])

    result = []

    for (tid, tname, sid), times in theater_dict.items():
        result.append({
            "theater_id": tid,
            "theater_name": tname,
            "screen_id": sid,
            "showtimes": times,
            "movieId":mid
        })

    return JsonResponse({"data": result})

@csrf_exempt
def viewseat(request, sid):

    layouts = tbl_screenseat.objects.filter(
        screen_id=sid
    ).select_related('seattype_id')

    data = []

    for layout in layouts:
        data.append({
            "layout_id": layout.id,
            "seat_type": layout.seattype_id.seattype_name,
            "rows": layout.rows,
            "columns": layout.columns,
            "aisles": layout.aisles,
            "price": layout.screenseat_amountper
        })

    return JsonResponse({"data": data})
    
@csrf_exempt
def BookedSeats(request, screen_id):

    booked = tbl_seatbooking.objects.filter(
        screenseat_id__screen_id=screen_id
    ).values_list('seatbooking_number', flat=True)

    return JsonResponse({'bookedSeats': list(booked)})


@csrf_exempt
def make_payment(request, booking_id):

    if request.method == "PUT":

        try:
            booking = tbl_booking.objects.get(id=booking_id)
             
            if booking.booking_status == 1:
               return JsonResponse({"msg": "Booking already paid"}, status=400)
            
            if booking.booking_status == 2:
                return JsonResponse({"msg": "Booking cancelled"}, status=400)

            booking.booking_status = 1  # Paid
            booking.save()

            return JsonResponse({
                "msg": "Payment Successful",
                "booking_id": booking.id,
                "status": booking.booking_status
            })

        except tbl_booking.DoesNotExist:
            return JsonResponse({"msg": "Booking not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)

    

@csrf_exempt
def booking_details(request, booking_id):

    try:
        booking = tbl_booking.objects.get(id=booking_id)

        seats = tbl_seatbooking.objects.filter(
            booking_id=booking
        ).values_list('seatbooking_number', flat=True)

        show = tbl_shows.objects.filter(
            movie_id=booking.movie_id
        ).first()

        screen = show.screen_id if show else None
        theater = screen.theater_id if screen else None

        return JsonResponse({
            "booking_id": booking.id,
            "movie": booking.movie_id.movie_title if booking.movie_id else "",
            "movie_poster": booking.movie_id.movie_poster.url if booking.movie_id and booking.movie_id.movie_poster else "",
            "theatre": theater.theater_name if theater else "",
            "screen": screen.Screen_name if screen else "",
            "seats": list(seats),
            "amount": booking.booking_amount,
            "booking_todate": booking.booking_todate,
            "booking_time": booking.booking_time,
            "user_name": booking.user_id.user_name if booking.user_id else ""
        })

    except tbl_booking.DoesNotExist:
        return JsonResponse({"msg": "Booking not found"}, status=404)
    
@csrf_exempt
def MyBookings(request, user_id):

    bookings = tbl_booking.objects.filter(user_id=user_id, booking_status=1).values(
        'id',
        'booking_amount', 
        'booking_todate',
        'booking_time',
        'booking_status',
        # 'seats'=list(seats),
        movie_title=F('movie_id__movie_title'),
        movie_poster=F('movie_id__movie_poster')
    )
    data = list(bookings)

    for b in data:

        seats = tbl_seatbooking.objects.filter(
            booking_id=b['id']
        ).values_list('seatbooking_number', flat=True)

        b['seats'] = list(seats)

    return JsonResponse({'data': data})

@csrf_exempt
def BookedSeatsForShow(request, screen_id, movie_id, show_time):
    from datetime import date
    today = date.today()

    booked = tbl_seatbooking.objects.filter(
        screenseat_id__screen_id=screen_id,
        booking_id__movie_id=movie_id,
        booking_id__booking_time=show_time,
        booking_id__booking_todate=today,
        booking_id__booking_status__in=[0, 1],
    ).values_list('screenseat_id', 'seatbooking_number')  # ✅ (layout_id, "A1")

    # ✅ return like ["12-A1","12-A2","15-A1"]
    booked_keys = [f"{layout_id}-{seat}" for (layout_id, seat) in booked]

    return JsonResponse({"bookedSeats": booked_keys})