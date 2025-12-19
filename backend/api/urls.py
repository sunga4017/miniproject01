from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    ScoreUploadView, DashboardStatsView,
    UserViewSet, StudentViewSet, SubjectViewSet, ExamViewSet, ScoreViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'scores', ScoreViewSet)

urlpatterns = [
    path('', include(router.urls)), # Router URLs
    path('upload-scores/', ScoreUploadView.as_view(), name='upload_scores'),
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
]